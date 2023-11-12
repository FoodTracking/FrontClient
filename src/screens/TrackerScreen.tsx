import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import io, { Socket } from "socket.io-client";

import { useAuthContext } from "../hooks/useAuthContext";
import { fetchUserOrders, queryClient } from "../lib/api/api";

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
  const { user } = useAuthContext();
  const [socket, setSocket] = React.useState<Socket | null>(null);

  const query = useQuery({
    queryKey: ["user-orders"],
    queryFn: () => fetchUserOrders(user!.id, 1),
  });

  useEffect(() => {
    const setupSocket = async () => {
      const newSocket = io(`${process.env.EXPO_PUBLIC_API_URL}/orders`, {
        auth: { token: await AsyncStorage.getItem("accessToken") },
      });
      newSocket.on("updateOrder", (order: Order) => {
        queryClient.invalidateQueries({ queryKey: ["user-orders"] });
        query.refetch();
      });
      setSocket(newSocket);
    };

    setupSocket();

    return () => {
      if (socket) {
        socket.off("updateOrder");
        socket.disconnect();
        setSocket(null);
      }
    };
  }, []);

  return (
    <SafeAreaView>
      {query.data?.map((order) => (
        <View key={order.id}>
          <Text>{order.id}</Text>
          <Text>{statusTranslation[order.status]}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
