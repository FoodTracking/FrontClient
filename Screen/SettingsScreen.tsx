import React from "react";
import { Text, View } from "react-native";
import BaseButton from "../src/components/Button/BaseButton";
import { useNavigation } from "@react-navigation/native";
export default function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 30 }}>
      <Text>Settings!</Text>
      <BaseButton
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
