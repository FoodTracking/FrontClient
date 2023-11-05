import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

export default function RestaurantCard({
  name,
  category,
  style,
  picture,
}: {
  name: string;
  category: string;
  style?: object;
  picture?: string;
}) {
  return (
    <Pressable
      style={{
        marginTop: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        ...style,
      }}
    >
      <Image
        source={{ uri: picture }}
        resizeMode={"cover"}
        style={{
          flex: 1,
          borderRadius: 9,
          backgroundColor: "grey",
        }}
      />
      <View
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          borderRadius: 10,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
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
            color: "grey",
          }}
        >
          Frais de service : 2€ - Pret dans 15min
        </Text>
      </View>
    </Pressable>
  );
}
