import { Skeleton } from "@rneui/base";
import { Image } from "@rneui/themed";
import React from "react";
import { Pressable, Text, View } from "react-native";

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
        marginBottom: 15,
        borderRadius: 10,
        ...style,
      }}
    >
      <Image
        source={{ uri: picture }}
        PlaceholderContent={
          <Skeleton style={{ height: "100%", width: "100%" }} />
        }
        containerStyle={{ width: "100%", height: 175, borderRadius: 8 }}
        resizeMode={"cover"}
      />
      <View
        style={{
          display: "flex",
          alignContent: "center",
          borderRadius: 10,
          marginTop: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "grey",
          }}
        >
          Frais de service : 2€ - Pret dans 15min
        </Text>
      </View>
    </Pressable>
  );
}
