import { createStackNavigator } from "@react-navigation/stack";

import { useAuthContext } from "../hooks/useAuthContext";
import UserProfileEdit from "../screens/EditIdentityScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditUserScreen from "../screens/EditUserScreen";
import EditRestaurantScreen from "../screens/EditRestaurantScreen";

export type ProfileParamList = {
  List: undefined;
  ConnectionInformation: undefined;
  AccountInformation: undefined;
  Products: undefined;
};

const Profile = createStackNavigator<ProfileParamList>();

export default function ProfileStack() {
  const { user } = useAuthContext();
  return (
    <Profile.Navigator initialRouteName={"List"}>
      <Profile.Screen
        name="List"
        options={{
          headerShown: false,
          title: "Profil",
        }}
        component={ProfileScreen}
      />
      <Profile.Screen
        name="ConnectionInformation"
        options={{
          headerShown: false,
          title: "Informations de connexion",
        }}
        component={UserProfileEdit}
      />
      <Profile.Screen
        name="AccountInformation"
        options={{
          headerShown: false,
          title: "Informations du compte",
        }}
        component={
          user?.role === "restaurant" ? EditRestaurantScreen : EditUserScreen
        }
      />
      {user?.role === "restaurant" && (
        <Profile.Screen
          name="Products"
          options={{
            headerShown: false,
            title: "Produits",
          }}
          component={UserProfileEdit}
        />
      )}
    </Profile.Navigator>
  );
}
