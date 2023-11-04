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

interface AuthStackProps {
  setIsAuth: (access: boolean) => void;
}

export default function AuthStack({ setIsAuth }: AuthStackProps) {
  return (
    <Stack.Navigator
      initialRouteName={"Onboarding"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Register">
        {(props) => (
          <RegisterScreen
            updateAccess={(access: boolean) => setIsAuth(access)}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            updateAccess={(access: boolean) => setIsAuth(access)}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
