import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import io, { Socket } from "socket.io-client";

import UserOrderCard from "../components/Card/UserOrder";
import { useAuthContext } from "../hooks/useAuthContext";
import { axiosInstance, fetchOrders } from "../lib/api/api";
import { Order } from "../types";

export enum OrderStatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
  DELIVERED = "DELIVERED",
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

  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const id = user?.id;
  const role = user?.role;

  const order = useQuery({
    queryKey: ["Orders", id],
    queryFn: () => fetchOrders(id!),
  });

  const getOrders = async () => {
    try {
      if (id && role) {
        const response = await axiosInstance.get(`/${role}s/${id}/orders`);
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
          const newSocket = io(`${process.env.EXPO_PUBLIC_API_URL}/orders`, {
            auth: { token: accessToken },
          });
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
          error
        );
      }
    };

    getOrders();

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
      <ScrollView
        style={{
          alignSelf: "center",
          width: "100%",
          height: "100%",
        }}
        refreshControl={
          <RefreshControl
            refreshing={order.isLoading}
            onRefresh={() => order.refetch()}
          />
        }
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {orders.map((order) => (
          <View>
            <UserOrderCard
              key={order.id}
              Restaurant={order.restaurant.name}
              orderId={order.id}
              orderDetails={order.products}
              price={order.price}
              orderStatus={statusTranslation[order.status as OrderStatusEnum]}
            ></UserOrderCard>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
