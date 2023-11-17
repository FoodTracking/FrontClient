import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { ExploreParamList } from "../../navigation/ExploreStack";
import { Restaurant, RestaurantPreview } from "../../types";
import AppImage from "../atoms/AppImage";

interface RestaurantCardProps {
  restaurant: RestaurantPreview;
  style?: object;
}

export default function RestaurantCard({
  restaurant,
  style,
}: RestaurantCardProps) {
  const navigation = useNavigation<NavigationProp<ExploreParamList>>();
  return (
    <Pressable
      style={{
        marginTop: 10,
        marginBottom: 15,
        borderRadius: 10,
        ...style,
      }}
      onPress={() => navigation.navigate("Details", { id: restaurant.id })}
    >
      <AppImage
        source={{ uri: restaurant.image }}
        containerStyle={{ width: "100%", height: 175, borderRadius: 8 }}
      />
      <View
        style={{
          display: "flex",
          gap: 3,
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
          {restaurant.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "grey",
          }}
        >
          {restaurant.address} • {Math.round(restaurant.distance / 1000)} km
        </Text>
      </View>
    </Pressable>
  );
}
