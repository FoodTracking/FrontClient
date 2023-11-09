import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import {AntDesign, Entypo, Feather, MaterialCommunityIcons,} from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import CommandesScreen from "../screens/CommandesScreen";
import TrackerScreen from "../screens/TrackerScreen";

export type MainStackParamList = {
  Restaurants: undefined;
  Tracker: undefined;
  Commandes: undefined;
  Profile: undefined;
};
interface AuthStackProps {
  setIsAuth: (access: boolean) => void;
}

const Tab = createBottomTabNavigator();

export default function MainStack({ setIsAuth }: AuthStackProps) {
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
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      >
        { (props) =>
          <ProfileScreen
            updateAccess={(access: boolean) => setIsAuth(access)}
            {...props}
          />
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
}
