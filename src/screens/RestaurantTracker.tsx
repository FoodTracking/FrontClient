import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import io, { Socket } from "socket.io-client";

import OrderListCard from "../components/Card/OrderListCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { fetchRestaurantsOrders, queryClient } from "../lib/api/api";
import { Order, OrderStatusEnum } from "../types";

const statusTranslation: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.DELIVERED]: "Délivrée",
  [OrderStatusEnum.PENDING]: "En attente",
  [OrderStatusEnum.IN_PROGRESS]: "En cours",
  [OrderStatusEnum.FINISHED]: "Prête",
};

export default function RestaurantTrackerScreen() {
  const { user } = useAuthContext();
  const [socket, setSocket] = React.useState<Socket | null>(null);

  const { data: orders, refetch } = useQuery({
    queryKey: ["restaurants-orders", user?.id],
    queryFn: () =>
      fetchRestaurantsOrders(
        user!.id,
        [
          OrderStatusEnum.PENDING,
          OrderStatusEnum.IN_PROGRESS,
          OrderStatusEnum.FINISHED,
        ],
        -1,
      ),
  });

  useEffect(() => {
    const setupSocket = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        console.log("Access Token:", accessToken);
        if (accessToken) {
          const newSocket = io(`${process.env.EXPO_PUBLIC_API_URL}/orders`, {
            auth: { token: accessToken },
          });
          newSocket.on("updateOrder", (order: Order) => {
            queryClient.invalidateQueries({ queryKey: ["restaurants-orders"] });
            refetch();
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

    setupSocket();

    return () => {
      if (socket) {
        socket.disconnect();
        socket.off("updateOrder");
        setSocket(null);
      }
    };
  }, []);

  return (
    <SafeAreaView>
      <Text h2>Commandes en cours</Text>
      <ScrollView>
        {orders?.map((order) => (
          <OrderListCard
            key={order.id}
            Customer={order.user}
            orderId={order.id}
            orderDetails={order.products}
            price={order.price}
            orderStatus={statusTranslation[order.status]}
            canUpdate
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
