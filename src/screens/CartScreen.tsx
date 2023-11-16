import {
  NavigationProp,
  RouteProp,
  StackActions,
} from "@react-navigation/native";
import { Skeleton } from "@rneui/base";
import { Button, Divider, Image, Text } from "@rneui/themed";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { insertOrder } from "../lib/api/api";
import { ExploreParamList } from "../navigation/ExploreStack";
import { MainStackParamList } from "../navigation/MainStack";
import { OrdersParamList } from "../navigation/OrdersStack";
import { CreateOrderDto } from "../types";

interface CartScreenProps {
  route:
    | RouteProp<ExploreParamList, "Cart">
    | RouteProp<OrdersParamList, "Cart">;
  navigation: NavigationProp<MainStackParamList>;
}

export function CartScreen({ navigation, route }: CartScreenProps) {
  const { restaurant, products, repayable } = route.params;

  const mutation = useMutation({
    mutationFn: (data: CreateOrderDto) => insertOrder(data),
    onSuccess: () => {
      showMessage({
        message: "Commande validée",
        type: "success",
      });

      navigation.dispatch(StackActions.popToTop());
      navigation.navigate("Tracker");
    },
  });

  const computeTotal = () => {
    return products.reduce((acc, { product, quantity }) => {
      return acc + product.price * quantity;
    }, 0);
  };

  const handleConfirm = () => {
    mutation.mutate({
      restaurantId: restaurant.id,
      products: products.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      })),
    });
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Image
        source={{ uri: restaurant?.image }}
        PlaceholderContent={
          <Skeleton style={{ height: "100%", width: "100%" }} />
        }
        containerStyle={{ width: "100%", height: 150 }}
        resizeMode={"cover"}
      />
      <Text style={{ fontSize: 28, textAlign: "center", marginTop: "5%" }}>
        {restaurant.name}
      </Text>
      <Text style={{ fontSize: 20, fontStyle: "italic", padding: 20 }}>
        Récapitulatif de la commande :
      </Text>
      <ScrollView>
        {products.map(({ product, quantity }) => (
          <View key={product.id}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                marginHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Text>{product.name}</Text>
              <View style={{ flex: 1 }} />
              <Text>{quantity}x </Text>
              <View />
              <Text>{product.price * quantity}€</Text>
            </View>
            <Divider />
          </View>
        ))}
      </ScrollView>

      {repayable && (
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
            <Button size={"md"} radius={"md"} onPress={handleConfirm}>
              <Text style={{ fontSize: 22 }}>Valider ({computeTotal()} €)</Text>
            </Button>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
