import React, { useEffect, useState } from "react";
import { View, Image, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./store";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n/i18n";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditUserScreen from "./screens/EditUserScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import { CartProvider } from "./slices/CartContext";
import CheckoutScreen from "./screens/CheckoutScreen";
import { stylesApp } from "./styles/stylesApp";

const Stack = createStackNavigator();

const LanguageSelector = () => {
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={stylesApp.idioma}>
      <Pressable onPress={() => changeLanguage("es")}>
        <Image
          style={stylesApp.bandera}
          source={require("./assets/espanol.jpg")}
        />
      </Pressable>
      <Pressable onPress={() => changeLanguage("en")}>
        <Image
          style={stylesApp.bandera}
          source={require("./assets/ingles.jpg")}
        />
      </Pressable>
    </View>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageSelector />
      <Provider store={store}>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "Login" }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: "Register" }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ProfileScreen")}
                    >
                      <Icon
                        name="user-circle"
                        size={25}
                        color="#000"
                        style={{ marginRight: 15 }}
                      />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ title: "ProfileScreen" }}
              />
              <Stack.Screen
                name="EditUser"
                component={EditUserScreen}
                options={{ title: "EditUser" }}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ title: "ProductDetail" }}
              />
              <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{ title: "Cart" }}
              />
              <Stack.Screen
                name="CheckoutScreen"
                component={CheckoutScreen}
                options={{ title: "Checkout" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </Provider>
    </I18nextProvider>
  );
}
