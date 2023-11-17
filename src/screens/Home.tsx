import { useInfiniteQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";

import RestaurantCard from "../components/organisms/RestaurantCard";
import SearchBar from "../components/organisms/SearchBarMenu";
import { fetchRestaurants } from "../lib/api/api";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const { fetchNextPage, isLoading, isError, data, refetch } = useInfiniteQuery(
    {
      initialPageParam: 1,
      queryKey: ["restaurants", { name, categories }],
      queryFn: ({ queryKey, pageParam = 1 }) =>
        fetchRestaurants(
          pageParam,
          queryKey[1] as { name?: string; categories?: string[] },
        ),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 5) {
          return undefined;
        }
        return allPages.length + 1;
      },
    },
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission non accordée",
          "Vous devez autoriser l'accès à la localisation pour utiliser l'application.",
        );
      }
    })();
  }, []);

  const handleSearch = async (query: string) => {
    setName(query);
  };

  const handleCategory = async (values: string[]) => {
    setCategories(values);
  };

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
    <SafeAreaView style={{ flex: 1, marginHorizontal: 15 }}>
      <SafeAreaView>
        <SearchBar onSearch={handleSearch} onChangeCategory={handleCategory} />
      </SafeAreaView>
      <ScrollView
        style={{
          alignSelf: "center",
          width: "100%",
          height: "100%",
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
        }
        contentInsetAdjustmentBehavior="automatic"
        onScroll={handleScroll}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {data?.pages?.map((page) => {
          return page.map((restaurant) => {
            return (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                category={restaurant.category}
                picture={restaurant.image}
                style={{
                  marginTop: 5,
                  backgroundColor: "white" /* height: 225*/,
                }}
              />
            );
          });
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
