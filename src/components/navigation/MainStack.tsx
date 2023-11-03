import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../../Screen/Home";
import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CommandesScreen from "../../../Screen/CommandesScreen";
import TrackerScreen from "../../../Screen/TrackerScreen";
import UserProfileEdit from "../../../Screen/ProfileScreen";

export type RootStackParamList = {
  Restaurants: undefined;
  Tracker: undefined;
  Commandes: undefined;
  Profile: undefined;
};
interface AuthStackProps {
  updateAccess: (access: string) => void;
}

const Tab = createBottomTabNavigator();

export default function MainStack({ updateAccess }: AuthStackProps) {
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
        component={TrackerScreen}
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
        component={CommandesScreen}
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
        component={() => (
          <UserProfileEdit
            updateAccess={(access: boolean) => updateAccess(access.toString())}
          />
        )}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
