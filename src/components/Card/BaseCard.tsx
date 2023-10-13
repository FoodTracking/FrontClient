import React from "react";
import { Text, View } from "react-native";

export default function BaseCard(
  name: string,
  description: string,
  price: number,
  image: string
) {
  return (
    <View>
      <Text style={{}}>{name}</Text>
    </View>
  );
}
