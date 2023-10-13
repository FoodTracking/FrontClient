import React from "react";
import { Text, View, Pressable } from "react-native";

export default function BaseButton({
  text,
  style,
  onPress,
}: {
  text: string;
  style?: any;
  onPress: () => void;
}) {
  return (
    <View>
      <Pressable
        style={{
          height: 50,
          width: 150,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          borderWidth: 1,
          borderColor: "grey",
          borderRadius: 10,
          ...style,
        }}
        onPress={onPress}
      >
        <Text style={{ color: "white", fontSize: 12 }}>{text}</Text>
      </Pressable>
    </View>
  );
}
