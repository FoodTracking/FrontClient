import { createStackNavigator } from "@react-navigation/stack";

import { CartScreen } from "../screens/CartScreen";
import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/Home";
import { Product, Restaurant } from "../types";

export type ExploreParamList = {
  Discover: undefined;
  Details: { id: string };
  Cart: {
    restaurant: Restaurant;
    products: { product: Product; quantity: number }[];
    repayable: boolean;
  };
};

const Explore = createStackNavigator<ExploreParamList>();

export default function ExploreNavigator() {
  return (
    <Explore.Navigator initialRouteName={"Discover"}>
      <Explore.Screen
        name="Discover"
        options={{
          headerShown: false,
          title: "Restaurants",
        }}
        component={HomeScreen}
      />
      <Explore.Screen name="Details" component={DetailsScreen} />
      <Explore.Screen
        name={"Cart"}
        options={{
          title: "Commande",
        }}
        component={CartScreen}
      />
    </Explore.Navigator>
  );
}
