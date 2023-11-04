import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import LoginScreen from "../screens/Auth/Login";
import Onboarding from "../screens/Auth/Onboarding";
import RegisterScreen from "../screens/Auth/Register";

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: { email: string; password: string };
  Register: { email: string; password: string };
  onBoarding: { userId: number };
};
const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={"Onboarding"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
