import React from "react";
import { Text, View } from "react-native";
import BaseButton from "../Button/BaseButton";
import { useNavigation } from "@react-navigation/native";
export default function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 30 }}>
      <Text>Settings!</Text>
      <BaseButton
        text="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
