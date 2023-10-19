import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import BaseButton from "../Button/BaseButton";

export default function FilterCard({
  title,
  style,
  picture,
}: {
  title: string;
  style?: object;
  picture?: unknown;
}) {
  return (
    <Pressable
      style={{
        height: 150,
        width: 350,
        marginLeft: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        ...style,
      }}
    >
      <Image
        source={picture}
        style={{
          flex: 1,
          width: undefined,
          height: undefined,
          resizeMode: "cover",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          height: "15%",
          width: "50%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            marginLeft: 10,
            fontWeight: "bold",
            color: "black",
            paddingBottom: 10,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            marginLeft: 10,
            color: "grey",
            paddingBottom: 10,
          }}
        ></Text>
      </View>
    </Pressable>
  );
}
