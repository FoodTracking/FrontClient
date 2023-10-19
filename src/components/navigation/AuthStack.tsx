import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../../../Screen/Auth/Onboarding";
import LoginScreen from "../../../Screen/Auth/Login";
import RegisterScreen from "../../../Screen/Auth/Register";

export type RootStackParamList = {
  Onboarding: undefined;
  Login: { email: string; password: string };
  Register: { email: string; password: string };
  onBoarding: { userId: number };
};
const Stack = createStackNavigator<RootStackParamList>();

interface AuthStackProps {
  updateAccess: (access: string) => void;
}

interface AuthComponentProps {
  updateAccess: (access: boolean) => void;
}

export default function AuthStack({ updateAccess }: AuthStackProps) {
  return (
    <Stack.Navigator
      initialRouteName={"Onboarding"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen
        name="Register"
        component={() => (
          <RegisterScreen
            updateAccess={(access: boolean) => updateAccess(access.toString())}
          />
        )}
      />
      <Stack.Screen
        name="Login"
        component={() => (
          <LoginScreen
            updateAccess={(access: boolean) => updateAccess(access.toString())}
          />
        )}
      />
    </Stack.Navigator>
  );
}
