import React, { useContext } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  FlatList,
  StatusBar,
} from "react-native";
import { useTranslation } from "react-i18next";
import { CartContext } from "../slices/CartContext";
import { stylesApp } from "../styles/stylesApp";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CheckoutScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);
  const { t } = useTranslation();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    // Simulación del proceso de pago
    Alert.alert(t("payment_success"), t("your_order_has_been_placed"), [
      {
        text: t("ok"),
        onPress: () => {
          clearCart();
          navigation.navigate("Home");
        },
      },
    ]);
  };

  // Renderizar un producto del carrito
  const renderCartItem = ({ item }) => (
    <View
      style={[
        stylesApp.containerList,
        {
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingVertical: 10,
        },
      ]}
    >
      <Text style={stylesApp.descripcion}>
        {t(item.name)} x {item.quantity}
      </Text>
      <Text style={stylesApp.precio}>${item.price * item.quantity}</Text>
    </View>
  );

  // Verificar si el carrito está vacío
  const isCartEmpty = cart.length === 0;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <View style={stylesApp.headerContainer}>
        <Pressable
          style={[stylesApp.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={stylesApp.textButton}>{t("back")}</Text>
        </Pressable>
        <Text style={stylesApp.title}>{t("pay")}</Text>
      </View>

      <View style={stylesApp.tarjeta}>
        <View style={stylesApp.cardDetail}>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
            style={{ marginVertical: 10 }}
          />
          <Text style={stylesApp.Subtitle}>
            {t("total_amount")} ${totalAmount}
          </Text>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable
          style={[stylesApp.cartButton, isCartEmpty && { opacity: 0.5 }]}
          onPress={isCartEmpty ? null : handlePayment}
          disabled={isCartEmpty}
        >
          <Text style={stylesApp.textButton}>{t("complete_order")}</Text>
        </Pressable>
      </View>

      <View style={{ padding: 10, marginTop: 200 }}>
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
