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
import { eventManager } from "../EventEmitter";
import { useAuthContext } from "../hooks/useAuthContext";

const Stack = createStackNavigator();

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
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "MainStack" : "AuthStack"}
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated && (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
      {isAuthenticated && (
        <Stack.Screen name="MainStack" component={MainStack} />
      )}
    </Stack.Navigator>
  );
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootStackNavigator />
    </NavigationContainer>
  );
}
