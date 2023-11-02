import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Palette } from "styles/colors";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

export const navigationRef = React.createRef();

export default function Root() {
  const [canAccessMainStack, setCanAccessMainStack] = useState(false);

  const updateCanAccessMainStack = (access) => {
    setCanAccessMainStack(access);
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        colors: {
          background: Palette.white,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {canAccessMainStack ? (
          <Stack.Screen
            name="MainStack"
            component={() => (
              <MainStack updateAccess={updateCanAccessMainStack} />
            )}
          />
        ) : (
          <Stack.Screen
            name="AuthStack"
            component={() => (
              <AuthStack updateAccess={updateCanAccessMainStack} />
            )}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
