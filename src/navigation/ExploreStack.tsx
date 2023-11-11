import {createStackNavigator} from "@react-navigation/stack";

import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/Home";


export type ExploreParamList = {
  Discover: undefined;
  Details: { id: string };
}

const Explore = createStackNavigator<ExploreParamList>();

export default function ExploreNavigator() {
  return (
    <Explore.Navigator
      initialRouteName={"Discover"}

    >
      <Explore.Screen
        name="Discover"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Explore.Screen
        name="Details"
        options={{
          headerShown: false,
        }}
        component={DetailsScreen}
      />
    </Explore.Navigator>
  );
}