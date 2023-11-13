import {createStackNavigator} from "@react-navigation/stack";

import {CartScreen} from "../screens/CartScreen";
import {Product, Restaurant} from "../types";
import OrderScreen from "../screens/OrderScreen";

export type OrdersParamList = {
  Logs: undefined;
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
