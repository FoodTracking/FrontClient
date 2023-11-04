import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { ColorSchemeName } from "react-native";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const Stack = createStackNavigator();

export function RootStackNavigator() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName={"AuthStack"}
      screenOptions={{ headerShown: false }}
    >
      {!isAuth && (
        <Stack.Screen name="AuthStack">
          {(props) => <AuthStack setIsAuth={setIsAuth} {...props} />}
        </Stack.Screen>
      )}
      {isAuth && (
        <Stack.Screen name="MainStack">
          <MainStack setIsAuth={setIsAuth} />
        </Stack.Screen>
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
