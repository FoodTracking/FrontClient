import React from "react";
import { FlatList, Text, View } from "react-native";
import CommandCard from "../Card/CommandCard";
import BaseCard from "../Card/BaseCard";

const ListCommandes = [
  {
    title: "",
    nbCommandes: 2,
    foodPlaceName: "MCDO",
    description: [{ name: "CBO", quantity: 3 }],
    price: 18,
  },
  {
    title: "",
    nbCommandes: 3,
    foodPlaceName: "OTACOS",
    description: [{ name: "Tacos", quantity: 2 }],
    price: 18,
  },
  {
    title: "",
    nbCommandes: 4,
    foodPlaceName: "SUSHI DESIGN",
    description: [{ name: "California saumon", quantity: 3 }],
    price: 18,
  },
  {
    title: "",
    nbCommandes: 5,
    foodPlaceName: "LA BOUCHERIE",
    description: [{ name: "Steack", quantity: 4 }],
    price: 18,
  },
];

export default function CommandesScreen() {
  return (
    <View style={{ flex: 1, alignSelf: "center", marginTop: 10 }}>
      <View style={{ margin: 10 }}>
        <CommandCard
          title="Votre derniere commande"
          nbCommandes={1}
          foodPlaceName="KFC"
          description={[{ name: "Poulet", quantity: 1 }]}
          price={0}
        />
      </View>
      <View style={{ margin: 10 }}>
        <FlatList
          data={ListCommandes}
          renderItem={({ item, index }) => (
            <CommandCard
              key={index}
              title={item.foodPlaceName}
              subtitle={item.title}
              picture={require("../../../assets/mcdo.jpg")}
              description={item.description}
              price={item.price}
              nbCommandes={item.nbCommandes}
            />
          )}
        />
      </View>
    </View>
  );
}
