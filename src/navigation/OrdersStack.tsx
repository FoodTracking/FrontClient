import { createStackNavigator } from "@react-navigation/stack";

import { useAuthContext } from "../hooks/useAuthContext";
import { CartScreen } from "../screens/CartScreen";
import RestaurantOrderScreen from "../screens/RestaurantOrderScreen";
import UserOrderScreen from "../screens/UserOrderScreen";
import { Product, Restaurant } from "../types";
import React from "react";
import {View, Text} from "react-native";

export type OrdersParamList = {
  Logs: undefined;
  Cart: {
    restaurant: Restaurant;
    products: { product: Product; quantity: number }[];
    repayable?: boolean;
  };
};

const Orders = createStackNavigator<OrdersParamList>();

export default function OrdersStack() {
  const { user } = useAuthContext();
  return (
    <Orders.Navigator initialRouteName={"Logs"}>
      <Orders.Screen
        name="Logs"
        options={{
          headerShown: false,
          title: "Commandes",
        }}
        component={
          user?.role === "restaurant" ? RestaurantOrderScreen : UserOrderScreen
        }
      />
      <Orders.Screen
        name={"Cart"}
        options={{
          title: "Commande",
        }}
        component={CartScreen}
      />
    </Orders.Navigator>
  );
}

const CustomHeader = ( props : any) => {
  return (
    <View>
      <Text>Custom Header</Text>
    </View>
  );
};
