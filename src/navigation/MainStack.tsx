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
import OrdersStack from "./OrdersStack";
import ProfileStack from "./ProfileStack";
import { useAuthContext } from "../hooks/useAuthContext";
import HomeScreen from "../screens/Home";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileEditScreen";
import RestaurantTrackerScreen from "../screens/RestaurantTracker";
import TrackerScreen from "../screens/TrackerScreen";

export type MainStackParamList = {
  Admin: undefined;
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
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
      {user?.role === "admin" && (
        <Tab.Screen
          name="Admin"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Gestion",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" color={color} size={size} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}
