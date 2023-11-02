import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import BaseButton from "../Button/BaseButton";
import { ImageSourcePropType } from "react-native";
export default function BaseCard({
  name,
  category,
  style,
  longitude,
  latitude,
  picture,
  coordinates,
  radius,
}: {
  name: string;
  longitude?: number;
  latitude?: number;
  category: string;
  style?: object;
  picture?: ImageSourcePropType;
  radius?: number;
  coordinates?: { longitude: number; latitude: number };
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
        source={picture as ImageSourcePropType}
        style={{
          flex: 1,
          width: undefined,
          height: undefined,
          resizeMode: "cover",
          borderRadius: 10,
          backgroundColor: "grey",
        }}
      />
      <View
        style={{
          height: "30%",
          width: "100%",
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
          }}
        >
          {name} - {category}
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
