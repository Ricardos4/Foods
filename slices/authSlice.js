import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem("userToken");
    },
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { loginSuccess, logout, updateUserInfo } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      username,
      password,
    });
    const { token, user } = response.data;

    await AsyncStorage.setItem("userToken", token);
    dispatch(loginSuccess({ user, token }));
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export default authSlice.reducer;
