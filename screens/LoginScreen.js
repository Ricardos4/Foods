import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { stylesApp } from "../styles/stylesApp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // Restablecer el mensaje de error cuando el idioma cambia
  useEffect(() => {
    setErrorMessage("");
  }, [i18n.language]);

  const handleLogin = async () => {
    if (!username.trim()) {
      setErrorMessage(t("username_empty"));
      return;
    }
    if (!password.trim()) {
      setErrorMessage(t("password_empty"));
      return;
    }
    try {
      const response = await axios.post("http://192.168.1.7:3000/login", {
        username: username,
        password: password,
      });
      const { token } = response.data;
      await AsyncStorage.setItem("userToken", token);
      navigation.navigate("Home");
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage(t("invalid_credentials"));
      } else {
        setErrorMessage(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <View style={stylesApp.padre}>
      <StatusBar />
      <Image
        source={require("../assets/Profile.jpeg")}
        style={stylesApp.perfil}
      />
      <Text style={stylesApp.Subtitle}>{t("sing_in")}</Text>
      <View style={stylesApp.tarjeta}>
        <View style={stylesApp.cajatexto}>
          <TextInput
            placeholder={t("your_email")}
            value={username}
            style={{ paddingHorizontal: 15 }}
            onChangeText={setUsername}
          />
        </View>
        <View style={stylesApp.cajatexto}>
          <TextInput
            style={{ paddingHorizontal: 15 }}
            placeholder={t("enter_your_password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
          />
          <Pressable
            onPress={() => setHidePassword(!hidePassword)}
            style={stylesApp.eyeIcon}
          >
            <Icon
              name={hidePassword ? "eye-slash" : "eye"}
              size={20}
              color="gray"
            />
          </Pressable>
        </View>
        {errorMessage ? (
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Text>
        ) : null}
        <View style={stylesApp.padreboton}>
          <Pressable style={stylesApp.boton} onPress={handleLogin}>
            <Text style={stylesApp.textoboton}>{t("login")}</Text>
          </Pressable>
          <Pressable
            style={stylesApp.boton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={stylesApp.textoboton}>
              {t("i_no_have_an_account")}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
