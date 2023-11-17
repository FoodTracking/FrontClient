import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ColorSchemeName } from "react-native";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useAuthContext } from "../hooks/useAuthContext";
import { eventManager } from "../utils/event-emitter";
import { FollowFoodTheme } from "../utils/theme";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Root = createStackNavigator<RootStackParamList>();

export function RootStackNavigator() {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const navigation = useNavigation();

  useEffect(() => {
    const redirectToLogin = () => {
      setIsAuthenticated(false);
    };

    eventManager.on("unauthorized", redirectToLogin);

    return () => {
      eventManager.off("unauthorized", redirectToLogin);
    };
  }, [navigation]);

  return (
    <Root.Navigator
      initialRouteName={isAuthenticated ? "Main" : "Auth"}
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated && <Root.Screen name="Auth" component={AuthStack} />}
      {isAuthenticated && <Root.Screen name="Main" component={MainStack} />}
    </Root.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer theme={FollowFoodTheme}>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
