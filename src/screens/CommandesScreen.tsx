import React from "react";
import { FlatList, View } from "react-native";

import CommandCard from "../components/Card/CommandCard";

const ListCommandes = [
  {
    title: "",
    nbCommandes: 2,
    foodPlaceName: "MCDO",
    description: [{ name: "CBO", quantity: 3 }],
    price: 18,
    image: require("../../assets/mcdo.jpg"),
  },
  {
    title: "",
    nbCommandes: 3,
    foodPlaceName: "OTACOS",
    description: [{ name: "Tacos", quantity: 2 }],
    price: 18,
    image: require("../../assets/kfc.jpg"),
  },
  {
    title: "",
    nbCommandes: 4,
    foodPlaceName: "SUSHI DESIGN",
    description: [{ name: "California saumon", quantity: 3 }],
    price: 18,
    image: require("../../assets/mcdo.jpg"),
  },
  {
    title: "",
    nbCommandes: 5,
    foodPlaceName: "LA BOUCHERIE",
    description: [{ name: "Steack", quantity: 4 }],
    price: 18,
    image: require("../../assets/kfc.jpg"),
  },
];

export default function CommandesScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "center",
        marginTop: 30,
      }}
    >
      <View style={{ margin: 10 }}>
        <CommandCard
          title="Votre derniere commande"
          nbCommandes={1}
          picture={require("../../assets/kfc.jpg")}
          foodPlaceName="KFC"
          description={[{ name: "Poulet", quantity: 1 }]}
          price={24}
          style={{ marginTop: 5, backgroundColor: "white" }}
        />
      </View>
      <View style={{ margin: 10 }}>
        <FlatList
          data={ListCommandes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CommandCard
              key={index}
              title={item.foodPlaceName}
              // subtitle={item.title}
              picture={require("../../assets/mcdo.jpg")}
              description={item.description}
              foodPlaceName={item.foodPlaceName}
              price={item.price}
              // image={item.image}
              nbCommandes={item.nbCommandes}
              style={{ margin: 5, backgroundColor: "white" }}
              // onPress={() => {}}
            />
          )}
        />
      </View>
    </View>
  );
}
