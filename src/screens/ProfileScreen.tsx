import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { ListItem, Text } from "@rneui/themed";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  TouchableHighlight,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

import ScreenTitle from "../components/molecules/ScreenTitle";
import AppImagePicker from "../components/molecules/AppImagePicker";
import { useAuthContext } from "../hooks/useAuthContext";
import { updateIdentity, updateUser } from "../lib/api/api";
import { ProfileParamList } from "../navigation/ProfileStack";
import { PickedImage, UserSession } from "../types";

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
  const [image, setImage] = useState<Partial<PickedImage> | undefined>(
    undefined,
  );

  const mutate = useMutation({
    mutationFn: async (data: PickedImage) =>
      updateIdentity({ id: user!.id, avatar: data }),
    onSuccess: (data: UserSession) => {
      showMessage({
        message: "Informations mises à jour",
        type: "success",
      });
      setImage({ uri: data.avatar });
    },
    onError: () => {
      showMessage({
        message: "Une erreur est survenue",
        type: "danger",
      });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenTitle title="Profil" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <AppImagePicker
          imageProps={{
            source: { uri: image?.uri ?? user?.avatar },
            containerStyle: {
              width: 140,
              height: 140,
              borderRadius: 100,
              marginVertical: 20,
            },
          }}
          onImageSelected={(image) => mutate.mutate(image)}
        />
      </View>
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
