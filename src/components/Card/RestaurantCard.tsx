import {NavigationProp, useNavigation} from "@react-navigation/native";
import { Skeleton } from "@rneui/base";
import { Image } from "@rneui/themed";
import React from "react";
import { Pressable, Text, View } from "react-native";

import {ExploreParamList} from "../../navigation/ExploreStack";

export default function RestaurantCard({
  id,
  name,
  style,
  picture,
}: {
  id: string;
  name: string;
  category: string;
  style?: object;
  picture?: string;
}) {
  const navigation = useNavigation<NavigationProp<ExploreParamList>>();
  return (
    <Pressable
      style={{
        marginTop: 10,
        marginBottom: 15,
        borderRadius: 10,
        ...style,
      }}
      onPress={() => navigation.navigate("Details", { id })}
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
