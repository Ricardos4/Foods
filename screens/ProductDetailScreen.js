import React, { useState, useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { stylesApp } from "../styles/stylesApp";
import Icon from "react-native-vector-icons/FontAwesome";
import { CartContext } from "../slices/CartContext";

export default function ProductDetail({ route, navigation }) {
  const { detail } = route.params;
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext); // Acceder al carrito

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    addToCart(detail, quantity);
    Alert.alert(
      t("success"),
      `${t("added_cart")} ${quantity} ${t(detail.name)}`
    );
  };

  // Funciones para incrementar y decrementar la cantidad
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <StatusBar />
        <View style={stylesApp.headerContainer}>
          <Text style={stylesApp.title}>{t(detail.name)}</Text>
          <Pressable onPress={handleGoBack} style={stylesApp.backButton}>
            <Text style={stylesApp.backButtonText}>{t("back")}</Text>
          </Pressable>
        </View>

        <View style={stylesApp.cardDetail}>
          <View style={stylesApp.tarjetaDetail}>
            <Image source={{ uri: detail.imagen }} style={stylesApp.imagen} />
            <View style={stylesApp.contenido}>
              <Text style={stylesApp.nombre}>{t(detail.name)}</Text>
              <Text style={stylesApp.precio}>$ {detail.price}</Text>
              <Text style={stylesApp.descripcion}>{t(detail.description)}</Text>
              <View style={stylesApp.containerAmount}>
                <Pressable
                  onPress={handleDecreaseQuantity}
                  style={stylesApp.textAmount}
                >
                  <Text style={stylesApp.quantityButtonText}>-</Text>
                </Pressable>
                <Text style={stylesApp.quantityText}>{quantity}</Text>
                <Pressable
                  onPress={handleIncreaseQuantity}
                  style={stylesApp.textAmount}
                >
                  <Text style={stylesApp.quantityButtonText}>+</Text>
                </Pressable>
              </View>
              <View style={stylesApp.containerButton}>
                <Pressable
                  onPress={handleAddToCart}
                  style={stylesApp.cartButton}
                >
                  <Text style={stylesApp.textButton}>{t("add_to_cart")}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: 30 }}>
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
      </View>
    </View>
  );
}
