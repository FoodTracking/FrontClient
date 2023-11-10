import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import HomeScreen from "../screens/Home";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RestaurantTrackerScreen from "../screens/RestaurantTracker";
import TrackerScreen from "../screens/TrackerScreen";
import { useEffect } from "react";
import CreateNewProduct from "../screens/CreateProduct";

export type MainStackParamList = {
  Restaurants: undefined;
  Tracker: undefined;
  Commandes: undefined;
  Profile: undefined;
  RestaurantTracker: undefined;
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
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
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
            <Entypo name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Commandes"
        component={OrderScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Commandes",
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={CreateNewProduct}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
