import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import io, { Socket } from "socket.io-client";

import OrderListCard from "../components/Card/OrderListCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { fetchUserOrders, queryClient } from "../lib/api/api";
import { Order, OrderStatusEnum } from "../types";
import HeaderCustom from "../components/HeaderCustom";

const statusTranslation: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.DELIVERED]: "Délivrée",
  [OrderStatusEnum.PENDING]: "En attente",
  [OrderStatusEnum.FINISHED]: "Prête",
  [OrderStatusEnum.IN_PROGRESS]: "En cours",
};

export default function TrackerScreen() {
  const { user } = useAuthContext();
  const [socket, setSocket] = React.useState<Socket | null>(null);

  const { data: orders } = useQuery({
    queryKey: ["user-orders", user?.id],
    queryFn: () =>
      fetchUserOrders(user!.id, [
        OrderStatusEnum.PENDING,
        OrderStatusEnum.IN_PROGRESS,
        OrderStatusEnum.FINISHED,
      ]),
  });

  useEffect(() => {
    const setupSocket = async () => {
      const newSocket = io(`${process.env.EXPO_PUBLIC_API_URL}/orders`, {
        auth: { token: await AsyncStorage.getItem("accessToken") },
      });
      newSocket.on("newOrder", () => {
        queryClient.invalidateQueries({ queryKey: ["user-orders"] });
      });
      newSocket.on("updateOrder", (order: Order) => {
        queryClient.invalidateQueries({ queryKey: ["user-orders"] });
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
      <HeaderCustom title="Commandes en cours" />
      <ScrollView>
        {orders?.map((order) => (
          <OrderListCard
            key={order.id}
            Customer={order.restaurant.name}
            orderId={order.id}
            price={order.price}
            orderStatus={statusTranslation[order.status]}
            canUpdate={false}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
