import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import io, { Socket } from "socket.io-client";

import { axiosInstance } from "../lib/api/api";

export enum OrderStatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
  DELIVERED = "DELIVERED",
}

interface Order {
  id: string;
  status: OrderStatusEnum;
}

const statusTranslation: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.DELIVERED]: "Délivrée",
  [OrderStatusEnum.PENDING]: "En attente",
  [OrderStatusEnum.FINISHED]: "Prête",
  [OrderStatusEnum.IN_PROGRESS]: "En cours",
};

export default function TrackerScreen() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [socket, setSocket] = React.useState<Socket | null>(null);

  const getMyIdentity = async () => {
    try {
      const response = await axiosInstance.get(`/identity/me`, {
        headers: {
          Authorization:
            "Bearer " + (await AsyncStorage.getItem("accessToken")),
        },
      });
      return response.data;
    } catch (error) {
      console.error("An error occurred when trying to get my ID:", error);
    }
  };

  return (
    <View>
      {orders.map((order) => (
        <View key={order.id}>
          <Text>{order.id}</Text>
          <Text>{statusTranslation[order.status]}</Text>
        </View>
      ))}
    </View>
  );
}
