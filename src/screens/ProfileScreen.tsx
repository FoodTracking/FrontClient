import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { ListItem, Text } from "@rneui/themed";
import HeaderCustom from "../components/HeaderCustom";

import {
  Image,
  Pressable,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

import { useAuthContext } from "../hooks/useAuthContext";
import { ProfileParamList } from "../navigation/ProfileStack";

const items: {
  title: string;
  path: keyof ProfileParamList;
  icon: string;
  requiredRole?: string;
}[] = [
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
    requiredRole: "restaurant",
  },
];

interface ProfileScreenProps {
  navigation: NavigationProp<ProfileParamList>;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user, setIsAuthenticated } = useAuthContext();

  return (
    <SafeAreaView>
      <HeaderCustom title="Profil" />
      <Pressable onPress={() => {}}>
        <Image
          source={require("../../assets/logo.png")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginTop: 20,
          }}
        />
      </Pressable>
      {items
        .filter((it) => !it.requiredRole || it.requiredRole === user?.role)
        .map((item, i) => (
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
