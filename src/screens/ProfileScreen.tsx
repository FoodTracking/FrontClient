import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { Icon, ListItem, Text } from "@rneui/themed";
import { SafeAreaView, TouchableHighlight } from "react-native";

import { ProfileParamList } from "../navigation/ProfileStack";
import {useAuthContext} from "../hooks/useAuthContext";

const items: { title: string; path: keyof ProfileParamList; icon: string }[] = [
  {
    title: "Informations de connexion",
    icon: "idcard",
    path: "ConnectionInformation",
  },
  {
    title: "Informations du compte",
    icon: "user",
    path: "AccountInformation",
  },
  {
    title: "Produits",
    icon: "shoppingcart",
    path: "Products",
  },
];

interface ProfileScreenProps {
  navigation: NavigationProp<ProfileParamList>;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { setIsAuthenticated } = useAuthContext();

  return (
    <SafeAreaView>
      <Text h2>Profil</Text>
      {items.map((item, i) => (
        <ListItem
          key={i}
          Component={TouchableHighlight}
          onPress={() => navigation.navigate(item.path)}
          bottomDivider
        >
          {/* @ts-ignore */}
          <AntDesign name={item.icon} size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      <ListItem
        Component={TouchableHighlight}
        onPress={async () => {
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
          setIsAuthenticated(false);
        }}
        bottomDivider
      >
        <AntDesign name={"logout"} size={24} color="black" />
        <ListItem.Content>
          <ListItem.Title>{"Déconnexion"}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </SafeAreaView>
  );
}
