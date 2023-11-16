import { createStackNavigator } from "@react-navigation/stack";

import CreateProductScreen from "../screens/CreateProductScreen";
import ProductsListScreen from "../screens/ProductsListScreen";
import { Product } from "../types";

export type ProfileOrderParamList = {
  List: undefined;
  Manage: { product?: Product } | undefined;
};

const ProfileOrder = createStackNavigator<ProfileOrderParamList>();

export default function ProfileOrdersStack() {
  return (
    <ProfileOrder.Navigator initialRouteName={"List"}>
      <ProfileOrder.Screen
        name="List"
        options={{
          headerShown: false,
          title: "Profil",
        }}
        component={ProductsListScreen}
      />
      <ProfileOrder.Screen
        name="Manage"
        options={{
          headerShown: false,
          title: "Créer un produit",
        }}
        component={CreateProductScreen}
      />
    </ProfileOrder.Navigator>
  );
}
