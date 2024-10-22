import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { stylesApp } from "../styles/stylesApp";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios"; // Asegúrate de importar axios

const RegisterScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState("user");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
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
        email, // Asegúrate de incluir el email
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
      <Text style={stylesApp.Subtitle}>{t("user_register")}</Text>
      <View style={stylesApp.tarjeta}>
        <View style={stylesApp.cajatexto}>
          <TextInput
            placeholder={t("username")}
            style={{ paddingHorizontal: 15 }}
            value={username}
            onChangeText={setUsername}
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
            <Text style={{ color: "white" }}>{t("register")}</Text>
          </Pressable>
          <Pressable style={stylesApp.boton} onPress={handleGoBack}>
            <Text style={{ color: "white" }}>{t("back")}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
