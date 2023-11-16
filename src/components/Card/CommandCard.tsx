import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon, Skeleton } from "@rneui/base";
import { Button, Image } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";

import { fetchOrder, fetchProducts, fetchRestaurant } from "../../lib/api/api";
import { OrdersParamList } from "../../navigation/OrdersStack";

interface CommandCardProps {
  id: string;
  restaurantId: string;
  title: string;
  quantity: number;
  price: number;
  picture: string;
  date: string;
  repayable: boolean;
  style?: ViewStyle;
}

export default function CommandCard({
  id,
  restaurantId,
  title,
  quantity,
  price,
  style,
  picture,
  date,
  repayable,
}: CommandCardProps) {
  const navigation = useNavigation<NavigationProp<OrdersParamList>>();

  const { data: restaurant } = useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => fetchRestaurant(restaurantId),
  });

  const handlePress = async () => {
    // Get order by id with products
    const order = await fetchOrder(id);
    const products = await fetchProducts(
      restaurantId,
      undefined,
      order.products.map((product) => product.productId),
      -1,
    );

    navigation.navigate("Cart", {
      restaurant: restaurant!,
      products: products.map((product) => ({
        product,
        quantity,
      })),
      repayable,
    });
  };

  return (
    <Pressable
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...style,
      }}
      onPress={handlePress}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 3,
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
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
                fontWeight: "bold",
                color: "black",
                alignSelf: "flex-start",
              }}
            >
              {title}
            </Text>
            <View
              style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}
            >
              <Text>{date}</Text>
              <Text style={{ marginHorizontal: 5 }}>•</Text>
              <Text>
                {quantity} produit{quantity >= 2 && "s"}
              </Text>
              <Text style={{ marginHorizontal: 5 }}>•</Text>
              <Text style={{ fontWeight: "bold" }}>{price} €</Text>
            </View>
          </View>
        </View>
        <Button
          color={"white"}
          title={"Commander"}
          onPress={() => handlePress()}
        >
          <AntDesign
            name={repayable ? "reload1" : "right"}
            size={20}
            color="black"
          />
        </Button>
      </View>
    </Pressable>
  );
}
