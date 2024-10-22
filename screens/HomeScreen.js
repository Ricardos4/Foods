import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Alert,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import { stylesApp } from "../styles/stylesApp";
import axios from "axios";

export default function App() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getProductsAndCategories = async () => {
      try {
        const productsResponse = await axios.get(
          "http://192.168.1.7:3000/products"
        );
        const categoriesResponse = await axios.get(
          "http://192.168.1.7:3000/categoria"
        );

        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error al obtener los productos o categorías:", error);
        Alert.alert(
          "Error",
          error.response?.data.message || "Error al contactar al servidor"
        );
      }
    };

    getProductsAndCategories();
  }, []);

  const filterByCategory = (category) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.categoria === category
      );
      setFilteredProducts(filtered);
    }
    setSelectedCategory(category);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    Alert.alert(t("session_closed"));
    navigation.navigate("Login");
  };

  const productList = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("ProductDetail", {
            detail: item,
            selectedCategory: item.categoria,
            categories,
          })
        }
      >
        <View style={stylesApp.tarjetaDetail}>
          <Image source={{ uri: item.imagen }} style={stylesApp.imagen} />
          <View style={stylesApp.contenido}>
            <Text style={stylesApp.nombre}>{t(item.name)}</Text>
            <Text style={stylesApp.precio}>$ {item.price}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const categoryList = ({ item }) => {
    return (
      <Pressable
        onPress={() => filterByCategory(item.name)}
        style={[
          stylesApp.categoryButton,
          selectedCategory === item.name && stylesApp.categoryButtonSelected,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <View style={[stylesApp.tarjetaDetail, { alignItems: "center" }]}>
          <Image source={{ uri: item.imagen }} style={stylesApp.imagen} />
          <View style={stylesApp.contenido}>
            <Text style={stylesApp.nombre}>{t(item.name)}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={stylesApp.safeAria}>
      <StatusBar />
      <View style={stylesApp.logout}>
        <View style={stylesApp.cerrarSesion}>
          <Pressable
            onPress={handleLogout}
            style={{
              flex: 1,
              backgroundColor: "#525FE1",
              borderRadius: 6,
            }}
          >
            <Text style={stylesApp.backButtonText}>{t("logout")}</Text>
          </Pressable>
        </View>
      </View>

      <View style={stylesApp.categoryContainer}>
        <FlatList
          data={[{ name: "all" }, ...categories]}
          keyExtractor={(item) => item.name}
          renderItem={categoryList}
          horizontal
        />
      </View>

      <View style={stylesApp.containerList}>
        {filteredProducts.length === 0 ? (
          <Text>No hay productos en esta categoría</Text>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={productList}
          />
        )}
      </View>

      <View style={stylesApp.abajoContainer}>
        <Pressable
          onPress={() => navigation.navigate("ProfileScreen")}
          style={stylesApp.abajoButton}
        >
          <Icon name="user-circle" size={30} color="#000" />
          <Text>{t("profile")}</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("CartScreen")}
          style={stylesApp.abajoButton}
        >
          <Icon name="shopping-cart" size={30} color="#000" />
          <Text>{t("cart")}</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("CheckoutScreen")}
          style={stylesApp.abajoButton}
        >
          <Icon name="check" size={30} color="#000" />
          <Text>{t("checkout")}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
