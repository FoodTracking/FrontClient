import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/base";
import axios from "axios";
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

  const getOrders = async () => {
    try {
      const identity = await getMyIdentity();
      const userId: string = identity.id;
      const userRole: string = identity.role;
      console.log(await getMyIdentity());

      if (userId) {
        const response = await axiosInstance.get(
          `/${userRole}s/${userId}/orders`,
          {
            headers: {
              Authorization:
                "Bearer " + (await AsyncStorage.getItem("accessToken")),
            },
          },
        );
        console.log(response.data);
        setOrders(response.data);
      } else {
        console.error("User ID not found");
      }
    } catch (error) {
      console.error("An error occurred when trying to get orders:", error);
    }
  };

  useEffect(() => {
    const setupSocket = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        console.log("Access Token:", accessToken);
        if (accessToken) {
          const newSocket = io(
            "https://api.follow-food.alexandre-pezat.fr/orders",
            {
              auth: { token: accessToken },
            },
          );
          newSocket.on("updateOrder", (order: Order) => {
            const o = orders.find((o) => o.id === order.id);
            console.log("o", o);
            if (!o) return;
            o.status = order.status;
            setOrders([...orders]);
          });
          setSocket(newSocket);
          console.log("Socket ON");
        } else {
          console.error("Ca marche pas");
        }
      } catch (error) {
        console.error(
          "Error retrieving access token from AsyncStorage:",
          error,
        );
      }
    };

    getOrders();

    // setupSocket();

    return () => {
      if (socket) {
        socket.disconnect();
        socket.off("updateOrder");
        setSocket(null);
      }
    };
  }, []);

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
