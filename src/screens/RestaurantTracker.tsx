/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import io, { Socket } from "socket.io-client";
import OrderListCard from "../components/Card/OrderListCard";
import { axiosInstance, fetchOrders, getMyIdentity } from "../lib/api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Identity, Order } from "../types";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function RestaurantTrackerScreen() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [socket, setSocket] = React.useState<Socket | null>(null);

  const queryClient = useQueryClient();

  const myIdentity = useQuery({
    queryKey: ["my-identity"],
    queryFn: getMyIdentity,
  });
  const order = useQuery({
    queryKey: ["Orders", myIdentity.data?.id],
    queryFn: () => fetchOrders(myIdentity.data?.id),
  });

  const getOrders = async () => {
    try {
      const identity: Identity = await getMyIdentity();
      const userId: string = identity.id;
      const userRole: string = identity.role;
      console.log(await getMyIdentity());

      if (userId) {
        const response = await axiosInstance.get(
          `/${userRole}s/${userId}/orders`
        );
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
          <OrderListCard
            key={order.id}
            Customer={order.user}
            orderId={order.id}
            orderDetails={order.products}
            price={order.price}
            orderStatus={statusTranslation[order.status]}
          ></OrderListCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
