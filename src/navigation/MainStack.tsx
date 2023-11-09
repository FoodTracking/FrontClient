import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useEffect } from 'react';

import CommandesScreen from '../screens/CommandesScreen';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/ProfileScreen';
import RestaurantTrackerScreen from '../screens/RestaurantTracker';
import TrackerScreen from '../screens/TrackerScreen';
import { axiosInstance, getMyIdentity } from '../lib/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export type MainStackParamList = {
  Restaurants: undefined;
  Tracker: undefined;
  Commandes: undefined;
  Profile: undefined;
  RestaurantTracker: undefined;
};

const Tab = createBottomTabNavigator<MainStackParamList>();

const getMyRole = async () => {
  const identity = await getMyIdentity();
  const userRole: string = identity.role;
  return userRole;
};

const isRestaurant = async () => {
  const role: string = await getMyRole();
  if (role === 'restaurant') {
    return true;
  } else {
    return false;
  }
};

export default function MainStack() {
  const [isRestaurantUser, setIsRestaurantUser] = React.useState(false);
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['my-identity'], queryFn: getMyIdentity });

  useEffect(() => {
    const checkUserRole = async () => {
      const result = await isRestaurant();
      setIsRestaurantUser(result);
    };

    checkUserRole();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName='Restaurants'
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name='Restaurants'
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='home' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='Tracker'
        component={isRestaurantUser ? RestaurantTrackerScreen : TrackerScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Tracker',
          tabBarIcon: ({ color, size }) => (
            <Entypo name='bell' color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name='Commandes'
        component={CommandesScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Commandes',
          tabBarIcon: ({ color, size }) => (
            <Feather name='shopping-bag' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
