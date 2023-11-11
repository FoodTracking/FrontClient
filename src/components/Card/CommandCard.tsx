import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Skeleton } from "@rneui/base";
import { Image, Overlay } from "@rneui/themed";
import React, { useState } from "react";
import { Button, Pressable, Text, View, ViewStyle } from "react-native";

import { fetchOrder, insertOrder } from "../../lib/api/api";
import { MainStackParamList } from "../../navigation/MainStack";

interface CommandCardProps {
  id: string;
  title: string;
  quantity: number;
  price: number;
  picture: string;
  date: string;
  style?: ViewStyle;
}

export default function CommandCard({
                                      id,
                                      title,
                                      quantity,
                                      price,
                                      style,
                                      picture,
                                      date,
                                    }: CommandCardProps) {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [isVisible, setVisible] =  useState(false);
  const handlePress = async (id: string) => {
    // Get order by id with products
    const order = await fetchOrder(id);
    try {
      await insertOrder({
        restaurantId: order.restaurant.id,
        products: order.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      });
      navigation.navigate("Tracker");
    } catch (error) {
      console.log(error);
    }
    // POst /orders
  };

  const handleOverlay = () => {
    setVisible(true);

  }

  return (
    <Pressable
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        padding: 10,
        ...style,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: picture }}
          PlaceholderContent={
            <Skeleton style={{ height: "100%", width: "100%" }} />
          }
          containerStyle={{ width: 60, height: 60, borderRadius: 50 }}
          resizeMode={"cover"}
        />
        <View>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {title}
          </Text>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}
          >
            <Text>{date}</Text>
            <Text style={{ marginHorizontal: 5 }}>•</Text>
            <Text>{quantity} produits</Text>
            <Text style={{ marginHorizontal: 5 }}>•</Text>
            <Text style={{ fontWeight: "bold" }}>{price} €</Text>
          </View>
        </View>
      </View>
      <Button title={"Commander"} onPress={() => handleOverlay()} />
      <Overlay isVisible={isVisible}>
        <Text>Voulez vous recommandé ?</Text>
        <Button title={"Oui"} onPress={() => handlePress(id)} />
        <Button title={"Non"} onPress={() => setVisible(false)} />
      </Overlay>
    </Pressable>
  );
}
