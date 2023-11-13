import { createStackNavigator } from "@react-navigation/stack";

import { CartScreen } from "../screens/CartScreen";
import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/Home";
import { Product, Restaurant } from "../types";
import OrderScreen from "../screens/OrderScreen";

export type OrdersParamList = {
  Logs: undefined;
  Details: { id: string };
  Cart: {
    restaurant: Restaurant;
    products: { product: Product; quantity: number }[];
  };
};

const Orders = createStackNavigator<OrdersParamList>();

export default function OrdersStack() {
  return (
    <Orders.Navigator initialRouteName={"Logs"}>
      <Orders.Screen
        name="Logs"
        options={{
          headerShown: false,
          title: "Commandes",
        }}
        component={OrderScreen}
      />
      <Orders.Screen name="Details" component={DetailsScreen} />
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
