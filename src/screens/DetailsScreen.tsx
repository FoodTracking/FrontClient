import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Skeleton } from "@rneui/base";
import { Button, Image, Text } from "@rneui/themed";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import ProductCardWithBottomSheet from "../components/Card/ProductCardWithBottomSheet";
import { fetchProducts, fetchRestaurant } from "../lib/api/api";
import { ExploreParamList } from "../navigation/ExploreStack";

interface DetailsScreenProps {
  route: RouteProp<ExploreParamList, "Details">;
  navigation: StackNavigationProp<ExploreParamList>;
}

export default function DetailsScreen({
  route,
  navigation,
}: DetailsScreenProps) {
  const { id } = route.params;
  const { data: restaurant } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => fetchRestaurant(id),
  });

  const { control, handleSubmit } = useForm<{
    products: { productId: string; quantity: number }[];
  }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data: any) => {
    navigation.navigate("Cart", {
      restaurant: restaurant!,
      products: data.products.map((product: any) => ({
        product: products?.pages
          .flatMap((page) => page)
          .find((p) => p.id === product.productId),
        quantity: product.quantity,
      })),
      repayable: true,
    });
  };

  const {
    fetchNextPage,
    data: products,
    refetch,
    ...rest
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => fetchProducts(id, pageParam),
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

  useEffect(() => {
    navigation.setOptions({ title: restaurant?.name });
  }, [restaurant]);

  const handleProductQuantityChange = (productId: string, quantity: number) => {
    const index = fields.findIndex((field) => field.productId === productId);
    if (index === -1) {
      append({ productId, quantity });
    } else {
      remove(index);
      append({ productId, quantity });
    }
  };

  return (
    <SafeAreaView>
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
        <Image
          source={{ uri: restaurant?.image }}
          PlaceholderContent={
            <Skeleton style={{ height: "100%", width: "100%" }} />
          }
          containerStyle={{ width: "100%", height: 270 }}
          resizeMode={"cover"}
        />

        <Text h3>Description</Text>
        <Text>{restaurant?.description}</Text>

        <Text h3>Produits</Text>
        <View>
          {products?.pages?.map((page) => {
            return page.map((product) => {
              return (
                <ProductCardWithBottomSheet
                  key={product.id}
                  product={product}
                  quantity={
                    fields.find((field) => field.productId === product.id)
                      ?.quantity
                  }
                  onChange={(quantity) =>
                    handleProductQuantityChange(product.id, quantity)
                  }
                />
              );
            });
          })}
        </View>
      </ScrollView>

      {fields.length > 0 && (
        <View
          style={{
            zIndex: 2,
            position: "absolute",
            bottom: 20,
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity>
            <Button size={"md"} radius={"md"} onPress={handleSubmit(onSubmit)}>
              <Text style={{ fontSize: 22 }}>Valider ({fields.length})</Text>
            </Button>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
