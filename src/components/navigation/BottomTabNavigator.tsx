import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../../Screen/Home";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import SettingsScreen from "../../../Screen/SettingsScreen";
import CommandesScreen from "../../../Screen/CommandesScreen";
import TrackerScreen from "../../../Screen/TrackerScreen";
import LoginScreen from "../../../Screen/Auth/Login";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="feed"
      screenOptions={{
        tabBarActiveTintColor: "black",
      }}
    >
      <Tab.Screen name="Login" component={LoginScreen}></Tab.Screen>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Tracker",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Commandes"
        component={CommandesScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Commandes",
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
