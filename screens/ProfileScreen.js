import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  StatusBar,
  FlatList,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { stylesApp } from "../styles/stylesApp";
import Icon from "react-native-vector-icons/FontAwesome";
import { decode } from "base-64";

const ProfileScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para la confirmación de la contraseña
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [users, setUsers] = useState([]);

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

  const handleUpdate = async () => {
    if (!password) {
      Alert.alert("Error", "La contraseña no puede estar vacía.");
      return;
    }

    if (!confirmPassword) {
      Alert.alert(
        "Error",
        "La confirmación de la contraseña no puede estar vacía."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "No se pudo obtener el ID del usuario.");
      return;
    }

    Alert.alert(t("userAlter"));
    setIsUpdating(true);

    try {
      await axios.put(`http://192.168.1.7:3000/users/${userId}`, {
        username,
        password,
      });

      setIsUpdating(false);
      setPassword("");
      setConfirmPassword(""); // Limpia el campo de confirmación
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      Alert.alert("Error", error.response?.data.message || error.message);
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (userRole !== "admin") {
      Alert.alert(
        "Acceso denegado",
        "No tienes permisos para eliminar usuarios."
      );
      return;
    }

    // Verifica si el usuario existe
    const userExists = users.some((user) => user.id === id);
    if (!userExists) {
      Alert.alert("Error", "El usuario que intentas eliminar no existe.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://192.168.1.7:3000/users/${id}`
      );
      if (response.status === 200) {
        Alert.alert("Usuario eliminado");
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error(
        "Error al eliminar usuario:",
        error.response ? error.response.data : error
      );
      Alert.alert("Error", error.response?.data.message || error.message);
    }
  };

  const handleEdit = (id) => {
    if (userId) {
      navigation.navigate("EditUser", { userIdToEdit: userId });
    } else {
      console.error("userId no está definido.");
    }
  };

  const handleCreateUser = () => {
    navigation.navigate("Register");
  };

  return (
    <ScrollView nestedScrollEnabled={true}>
      <StatusBar />
      <View style={stylesApp.headerContainer}>
        <Text style={stylesApp.title}>{t("editProfile")}</Text>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={stylesApp.backButton}
        >
          <Text style={stylesApp.backButtonText}>{t("back")}</Text>
        </Pressable>
      </View>

      <View style={stylesApp.tarjeta}>
        <Text style={stylesApp.Subtitle}>{t("username")}</Text>
        <View style={stylesApp.cajatexto}>
          <Text style={stylesApp.disable}>{username}</Text>
        </View>
        <Text style={stylesApp.Subtitle}>{t("newPass")}</Text>
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
        <Text style={stylesApp.Subtitle}>{t("confirmPassword")}</Text>
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

        <View style={stylesApp.padreboton}>
          <Pressable
            style={stylesApp.boton}
            onPress={handleUpdate}
            disabled={isUpdating}
          >
            <Text style={{ color: "white" }}>
              {isUpdating ? t("userUpdate") : t("UpdateProfile")}{" "}
            </Text>
          </Pressable>
        </View>

        {userRole === "admin" && (
          <View style={stylesApp.padreboton}>
            <Pressable style={stylesApp.boton} onPress={handleCreateUser}>
              <Text style={{ color: "white" }}>{t("createUser")}</Text>
            </Pressable>
          </View>
        )}
      </View>

      {userRole === "admin" && (
        <View style={stylesApp.tarjeta}>
          <Text style={stylesApp.title}>{t("allUsers")}</Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={stylesApp.tabla}>
                <Text style={stylesApp.Subtitle}>
                  {t("Users")} {item.username}
                </Text>
                <Text style={stylesApp.Subtitle}>
                  ({t("role")}: {item.role})
                </Text>
                <View style={stylesApp.padreboton}>
                  <Pressable
                    style={stylesApp.editButton}
                    onPress={() => handleEdit(item.id)}
                  >
                    <Text style={stylesApp.textoboton}>{t("edit")}</Text>
                  </Pressable>
                  <Pressable
                    style={stylesApp.deletButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={stylesApp.textoboton}>{t("delete")}</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
          <View>
            <Text style={{ textAlign: "center" }}>. . . </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
