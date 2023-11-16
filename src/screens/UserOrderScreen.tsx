import { NavigationProp } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import CommandCard from "../components/Card/CommandCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { fetchUserOrders } from "../lib/api/api";
import { MainStackParamList } from "../navigation/MainStack";
import HeaderCustom from "../components/HeaderCustom";

interface OrderScreenProps {
  navigation: NavigationProp<MainStackParamList>;
}

export default function UserOrderScreen({ navigation }: OrderScreenProps) {
  const { user } = useAuthContext();
  const { fetchNextPage, isLoading, isError, data, refetch } = useInfiniteQuery(
    {
      initialPageParam: 1,
      queryKey: ["orders"],
      queryFn: ({ pageParam = 1 }) => fetchUserOrders(user!.id, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 5) {
          return undefined;
        }
        return allPages.length + 1;
      },
    }
  );

  // This is the event handler for scroll events
  const handleScroll = async ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(nativeEvent)) {
      await fetchNextPage();
    }
  };

  // Helper function to determine if the scroll is close to the bottom
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 500; // how far from the bottom you want to trigger the fetch
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <HeaderCustom title="Commandes passées" />
      <View style={{ margin: 10 }}>
        <ScrollView
          style={{
            alignSelf: "center",
            width: "100%",
            height: "100%",
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refetch()}
            />
          }
          contentInsetAdjustmentBehavior="automatic"
          onScroll={handleScroll}
          scrollEventThrottle={400}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {data?.pages?.map((page) => {
            return page.map((item) => {
              return (
                <CommandCard
                  key={item.id}
                  id={item.id}
                  restaurantId={item.restaurant.id}
                  title={item.restaurant.name}
                  picture={item.restaurant.image}
                  quantity={item.quantity}
                  price={item.price}
                  date={dayjs(item.createdAt).format("D MMM.")}
                  style={{ marginVertical: 5, backgroundColor: "white" }}
                  repayable={true}
                />
              );
            });
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
