import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationProp } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureDetector,
  LongPressGestureHandler,
} from "react-native-gesture-handler";

import ProductCard from "../components/Card/ProductCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { fetchProducts } from "../lib/api/api";
import { ProfileOrderParamList } from "../navigation/ProfileOrdersStack";

export interface OrdersListScreenProps {
  navigation: NavigationProp<ProfileOrderParamList>;
}

export default function OrdersListScreen({
  navigation,
}: OrdersListScreenProps) {
  const { user } = useAuthContext();
  const {
    fetchNextPage,
    data: products,
    refetch,
    ...rest
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => fetchProducts(user!.id, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

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
      <View
        style={{
          display: "flex",
          width: "100%",
          paddingHorizontal: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 18 }}>Produits</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Manage")}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          position: "relative",
          zIndex: 1,
          alignSelf: "center",
          width: "100%",
          height: "100%",
        }}
        refreshControl={
          <RefreshControl
            refreshing={rest.isLoading}
            onRefresh={() => refetch()}
          />
        }
        contentInsetAdjustmentBehavior="automatic"
        onScroll={handleScroll}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          {products?.pages?.map((page) => {
            return page.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => navigation.navigate("Manage", { product })}
                />
              );
            });
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
