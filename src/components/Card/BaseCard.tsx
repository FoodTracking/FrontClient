import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import BaseButton from "../Button/BaseButton";

export default function BaseCard({
  title,
  subtitle,
  style,
  picture,
}: {
  title: string;
  subtitle: string;
  style?: any;
  picture?: any;
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
        }}
      />
      <View
        style={{
          height: "40%",
          width: "100%",
          borderWidth: 0.5,
          borderRadius: 10,
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
          {title} - {subtitle}
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            marginLeft: 10,
            color: "grey",
            paddingBottom: 10,
          }}
        >
          Frais de service : 2€ - Pret dans 15min
        </Text>
      </View>
    </Pressable>
  );
}
