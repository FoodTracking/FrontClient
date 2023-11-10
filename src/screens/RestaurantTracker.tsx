import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { View } from "react-native";
import io, { Socket } from "socket.io-client";

import OrderListCard from "../components/Card/OrderListCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { axiosInstance, fetchOrders, queryClient } from "../lib/api/api";
import { Order, OrderStatusEnum } from "../types";



const statusTranslation: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.DELIVERED]: "Délivrée",
  [OrderStatusEnum.PENDING]: "En attente",
  [OrderStatusEnum.FINISHED]: "Prête",
  [OrderStatusEnum.IN_PROGRESS]: "En cours",
};

export default function RestaurantTrackerScreen() {
  const { user } = useAuthContext();
  const [socket, setSocket] = React.useState<Socket | null>(null);


  const { data: orders, refetch } = useQuery({
    queryKey: ["restaurants-orders", user?.id],
    queryFn: () => fetchOrders(user!.id),
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
            queryClient.invalidateQueries({ queryKey: ["restaurants-orders"] })
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
          error
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
    <View>
      {orders?.map((order) => (
        <OrderListCard
          key={order.id}
          Customer={order.user}
          orderId={order.id}
          orderDetails={order.products}
          price={order.price}
          orderStatus={statusTranslation[order.status]}
        ></OrderListCard>
      ))}
    </View>
  );
}
