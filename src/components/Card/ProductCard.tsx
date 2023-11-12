import { Skeleton } from "@rneui/base";
import { Image } from "@rneui/themed";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Product } from "../../types";
import BottomSheetProduct from "../BottomSheetProduct";

interface ProductCardProps {
  product: Product;
  quantity?: number;
  onChange: (value: number) => void;
}

export default function ProductCard({
  product,
  quantity,
  onChange,
}: ProductCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
      onPress={() => setOpen(true)}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: product.image }}
          borderRadius={10}
          PlaceholderContent={
            <Skeleton style={{ height: "100%", width: "100%" }} />
          }
          containerStyle={{ width: 90, height: 90 }}
          resizeMode={"cover"}
        />
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {product.name}
          </Text>
          <Text style={{ fontWeight: "bold" }}>{product.price} €</Text>
          <Text>{product.description}</Text>
        </View>
        <BottomSheetProduct
          isOpen={open}
          setOpen={setOpen}
          product={product}
          quantity={quantity}
          onChange={onChange}
        />
      </View>
    </Pressable>
  );
}
