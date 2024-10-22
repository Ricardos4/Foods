import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesApp } from "../styles/stylesApp";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";
import { decode } from "base-64";
import axios from "axios"; // Asegúrate de importar axios

const EditUserScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación de contraseña
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true); // Control para la visibilidad de confirmPassword
  const [error, setError] = useState("");
  const [role, setRole] = useState("user");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          const payload = decode(token.split(".")[1]);
          const { id, role } = JSON.parse(payload);
          setUserId(id);
          setUserRole(role);

          const response = await axios.get(
            `http://192.168.1.7:3000/users/${id}`
          );
          setUsername(response.data.username);

          if (role === "admin") {
            const usersResponse = await axios.get(
              "http://192.168.1.7:3000/users"
            );
            setUsers(usersResponse.data);
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        Alert.alert(
          "Error",
          error.response?.data.message || "Error al contactar al servidor"
        );
      }
    };
    getUserData();
  }, []);

  const handleRegister = async () => {
    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres y contener números."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        password,
        email,
        role,
      });
      Alert.alert(t("registered_user"));
      Alert.alert("Registro exitoso");
      navigation.navigate("Login");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      console.log(error); // Para ver el error completo en la consola
    }
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("No hay pantallas a las que volver");
    }
  };

  return (
    <View style={stylesApp.padre}>
      <StatusBar />
      <Text style={stylesApp.Subtitle}>{t("editUser")}</Text>
      <View style={stylesApp.tarjeta}>
        <View style={stylesApp.cajatexto}>
          <TextInput
            placeholder={t("username")}
            style={stylesApp.disable}
            value={username}
            onChangeText={setUsername}
            editable={false}
          />
        </View>
        <View style={stylesApp.cajatexto}>
          <TextInput
            placeholder={t("enter_your_password")}
            style={{ paddingHorizontal: 15 }}
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
        {/* Campo para confirmar la contraseña */}
        <View style={stylesApp.cajatexto}>
          <TextInput
            placeholder={t("confirmPassword")}
            style={{ paddingHorizontal: 15 }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={hideConfirmPassword}
          />
          <Pressable
            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
            style={stylesApp.eyeIcon}
          >
            <Icon
              name={hideConfirmPassword ? "eye-slash" : "eye"}
              size={20}
              color="gray"
            />
          </Pressable>
        </View>
        {error ? <Text style={stylesApp.error}>{error}</Text> : null}
        <View style={stylesApp.cajatexto}>
          <TextInput
            placeholder={t("enter_your_email")}
            style={{ paddingHorizontal: 15 }}
            onChangeText={setEmail}
          />
        </View>
        <View style={stylesApp.padreboton}>
          <Pressable style={stylesApp.boton} onPress={handleRegister}>
            <Text style={{ color: "white" }}>{t("editUser")}</Text>
          </Pressable>
          <Pressable style={stylesApp.boton} onPress={handleGoBack}>
            <Text style={{ color: "white" }}>{t("back")}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default EditUserScreen;
