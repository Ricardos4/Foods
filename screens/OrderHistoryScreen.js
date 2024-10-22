import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get("http://localhost:3000/orders", {
        headers,
      });
      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  return (
    <View>
      <Text>Historial de Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Pedido #{item.id}</Text>
            <Text>Total: ${item.total_price}</Text>
            <Text>Estado: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OrderHistoryScreen;
