import { NavigationProp } from "@react-navigation/native";
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

import ScreenTitle from "../components/molecules/ScreenTitle";
import CommandCard from "../components/organisms/CommandCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { fetchRestaurantsOrders } from "../lib/api/api";
import { MainStackParamList } from "../navigation/MainStack";
import { OrderStatusEnum } from "../types";

interface OrderScreenProps {
  navigation: NavigationProp<MainStackParamList>;
}

export default function RestaurantOrderScreen({
  navigation,
}: OrderScreenProps) {
  const { user } = useAuthContext();
  const { fetchNextPage, isLoading, isError, data, refetch } = useInfiniteQuery(
    {
      initialPageParam: 1,
      queryKey: ["orders"],
      queryFn: ({ pageParam = 1 }) =>
        fetchRestaurantsOrders(
          user!.id,
          [OrderStatusEnum.DELIVERED],
          5,
          pageParam,
        ),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 5) {
          return undefined;
        }
        return allPages.length + 1;
      },
    },
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
    <SafeAreaView>
      <ScreenTitle title="Historique" />

      <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
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
                  restaurantId={user!.id}
                  title={item.user.name}
                  picture={item.user.avatar}
                  quantity={item.quantity}
                  price={item.price}
                  date={dayjs(item.createdAt).format("D MMM.")}
                  style={{ marginVertical: 5, backgroundColor: "white" }}
                  repayable={false}
                />
              );
            });
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
