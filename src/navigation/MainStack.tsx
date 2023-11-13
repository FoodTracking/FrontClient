import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { useEffect } from "react";

import ExploreNavigator from "./ExploreStack";
import { useAuthContext } from "../hooks/useAuthContext";
import HomeScreen from "../screens/Home";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RestaurantTrackerScreen from "../screens/RestaurantTracker";
import TrackerScreen from "../screens/TrackerScreen";
import OrdersStack from "./OrdersStack";

export type MainStackParamList = {
  Restaurants: undefined;
  Tracker: undefined;
  Commandes: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainStackParamList>();

export default function MainStack() {
  const { user } = useAuthContext();

  useEffect(() => {}, [user]);

  return (
    <Tab.Navigator
      initialRouteName="Restaurants"
      screenOptions={{
        tabBarActiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="Restaurants"
        component={ExploreNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Explorer",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Tracker"
        component={
          user?.role === "restaurant" ? RestaurantTrackerScreen : TrackerScreen
        }
        options={{
          headerShown: false,
          tabBarLabel: "Tracker",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="bells" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Commandes"
        component={OrdersStack}
        options={{
          headerShown: false,
          tabBarLabel: "Commandes",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Paramètres",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
