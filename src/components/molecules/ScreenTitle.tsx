import { Text } from "@rneui/themed";
import React from "react";
import { SafeAreaView } from "react-native";

export default function ScreenTitle({ title }: { title: string }) {
  return (
    <SafeAreaView>
      <Text
        h3
        style={{
          fontWeight: "bold",
          marginTop: 25,
          marginLeft: 20,
          paddingBottom: 5,
        }}
      >
        {title}
      </Text>
    </SafeAreaView>
  );
}
