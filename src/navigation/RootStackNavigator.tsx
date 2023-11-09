import React, {useState} from "react";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import MainStack from "./MainStack";
import AuthStack, {AuthStackParamList} from "./AuthStack";
import {ColorSchemeName} from "react-native";
import {DarkTheme, DefaultTheme, NavigationContainer, RouteProp} from "@react-navigation/native";

const Stack = createStackNavigator();

export function RootStackNavigator() {
  const [isAuth, setIsAuth] = useState(false);

  return <Stack.Navigator
    initialRouteName={"AuthStack"}
    screenOptions={{ headerShown: false }}
  >
    { !isAuth &&
        <Stack.Screen
            name="AuthStack"
        >
          {(props) => <AuthStack setIsAuth={setIsAuth} {...props} /> }
        </Stack.Screen>
    }
    { isAuth &&
        <Stack.Screen
            name="MainStack"
        >
            <MainStack setIsAuth={setIsAuth} />
        </Stack.Screen>
    }
  </Stack.Navigator>;
}

export default function Navigation({colorScheme}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootStackNavigator />
    </NavigationContainer>
  );
}
