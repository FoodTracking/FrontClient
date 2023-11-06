import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import { Palette } from "../../styles/colors";
import RestaurantCard from "../components/Card/RestaurantCard";
import SearchBar from "../components/Search/SearchBarMenu";
import { fetchRestaurants } from "../lib/api/api";

export default function HomeScreen() {
  let name: string = "";
  const { fetchNextPage, isLoading, isError, data, refetch } = useInfiniteQuery(
    {
      initialPageParam: 1,
      queryKey: ["restaurants"],
      queryFn: ({ pageParam = 1 }) => fetchRestaurants(pageParam, name),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 5) {
          return undefined;
        }
        return allPages.length + 1;
      },
    },
  );

  const handleSearch = async (query: string) => {
    name = query;
    await refetch();
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

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error :(</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: Palette.lightGrey }}>
        <SearchBar onSearch={handleSearch} />
      </SafeAreaView>
      <ScrollView
        style={{
          alignSelf: "center",
          width: "100%",
          height: "100%",
          backgroundColor: Palette.lightGrey,
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
        }
        contentInsetAdjustmentBehavior="automatic"
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        {/*<FlatList*/}
        {/*  horizontal={true}*/}
        {/*  data={FilstersList}*/}
        {/*  keyExtractor={(_, index) => index.toString()}*/}
        {/*  renderItem={({ item, index }) => (*/}
        {/*    <FilterCard*/}
        {/*      key={index}*/}
        {/*      title={item.name}*/}
        {/*      picture={item.picture}*/}
        {/*      style={{ marginTop: 5, backgroundColor: "white" }}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<View style={{ flexDirection: "row", marginTop: 10 }}>*/}
        {/*  <CommandCard*/}
        {/*    title="Votre derniere commande"*/}
        {/*    // nbCommandes={1}*/}
        {/*    foodPlaceName="KFC"*/}
        {/*    description={[{ name: "Poulet", quantity: 1 }]}*/}
        {/*    price={0}*/}
        {/*    style={{ margin: 5, backgroundColor: "white" }}*/}
        {/*  />*/}
        {/*</View>*/}
        {data?.pages?.map((page, index) => {
          return page.map((restaurant, index) => {
            return (
              <RestaurantCard
                key={index}
                name={restaurant.name}
                category={restaurant.category}
                picture={restaurant.image}
                style={{ marginTop: 5, backgroundColor: "white", height: 200 }}
              />
            );
          });
        })}

        {/*  button next page */}
        {/*{hasNextPage && (*/}
        {/*  <BaseButton onPress={fetchNextPage} title="Next page" />*/}
        {/*)}*/}
      </ScrollView>
    </SafeAreaView>
  );
}
