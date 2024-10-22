import React, { useContext } from "react";
import { View, Text, FlatList, Pressable, ScrollView } from "react-native";
import { CartContext } from "../slices/CartContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import { stylesApp } from "../styles/stylesApp";

export default function CartScreen({ navigation }) {
  const {
    cart,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);
  const { t } = useTranslation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderCartItem = ({ item }) => (
    <View
      style={[
        stylesApp.containerList,
        { borderBottomWidth: 1, borderBottomColor: "#ccc" },
      ]}
    >
      <Text style={stylesApp.descripcion}>
        {t(item.name)} x {item.quantity}
      </Text>
      <Text style={stylesApp.precio}>$ {item.price * item.quantity}</Text>
      <View style={stylesApp.containerAmount}>
        <Pressable
          onPress={() => decreaseQuantity(item.id)}
          style={stylesApp.textAmount}
        >
          <Text style={stylesApp.quantityButtonText}>-</Text>
        </Pressable>
        <Text style={stylesApp.quantityText}>{item.quantity}</Text>
        <Pressable
          onPress={() => increaseQuantity(item.id)}
          style={stylesApp.textAmount}
        >
          <Text style={stylesApp.quantityButtonText}>+</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => removeFromCart(item.id)}
        style={stylesApp.removeButton}
      >
        <Text style={stylesApp.textButton}>{t("remove")}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={stylesApp.headerContainer}>
        <Text style={stylesApp.title}>{t("cart")}</Text>
        <Pressable onPress={handleGoBack} style={stylesApp.backButton}>
          <Text style={stylesApp.backButtonText}>{t("back")}</Text>
        </Pressable>
      </View>

      <View style={stylesApp.cardDetail}>
        <View style={stylesApp.tarjetaDetail}>
          {cart.length === 0 ? (
            <Text style={stylesApp.Subtitle}>{t("cart_empty")}</Text>
          ) : (
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCartItem}
              style={{ marginBottom: 20 }} // Añadir margen inferior para separarlo de los botones
            />
          )}

          {/* Botones debajo de la lista */}
          {cart.length > 0 && (
            <View style={{ paddingVertical: 20, alignItems: "center" }}>
              <Pressable
                style={stylesApp.cartButton}
                onPress={() => navigation.navigate("CheckoutScreen")}
              >
                <Text style={stylesApp.textButton}>{t("checkout")}</Text>
              </Pressable>
              <Pressable onPress={clearCart} style={stylesApp.cartButton}>
                <Text style={stylesApp.textButton}>{t("clear_cart")}</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

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
