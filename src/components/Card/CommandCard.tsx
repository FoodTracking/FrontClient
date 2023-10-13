import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import BaseButton from "../Button/BaseButton";

export default function CommandCard({
  title,
  foodPlaceName,
  nbCommandes,
  description,
  price,
  style,
  image,
}: {
  title: string;
  foodPlaceName: string;
  description: [{ name: string; quantity: number }];
  nbCommandes: number;
  price: number;
  style?: any;
  image?: any;
}) {
  return (
    <Pressable
      style={{
        height: 150,
        width: 350,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        ...style,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          marginLeft: 10,
          fontWeight: "bold",
          color: "black",
          paddingBottom: 10,
        }}
      >
        {title}
      </Text>
      <Image
        source={image}
        style={{
          height: 80,
          width: 80,
          position: "absolute",
          right: 10,
          top: 10,
          borderRadius: 10,
          backgroundColor: image ? "grey" : "white",
        }}
      />
      <BaseButton
        text="Repasser commande"
        onPress={() => {}}
        style={{
          zIndex: 1,
          height: 30,
          right: 2,
          position: "absolute",
          top: 70,
        }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{}}>
          N° commande :{"  "}
          <Text style={{ fontWeight: "bold" }}>{nbCommandes}</Text>
        </Text>
        <Text style={{}}>
          Restaurant :{"  "}
          <Text style={{ fontWeight: "bold" }}>{foodPlaceName}</Text>
        </Text>
        <Text style={{ marginBottom: 5 }}>Description : </Text>

        {description.map((item, index) => (
          <Text key={index} style={{ fontWeight: "bold", marginBottom: 2 }}>
            {" "}
            - {item.quantity}x {item.name}
          </Text>
        ))}
        <Text style={{}}>
          Total de la comamnde :{" "}
          <Text style={{ fontWeight: "bold" }}>{price} €</Text>
        </Text>
      </View>
    </Pressable>
  );
}
