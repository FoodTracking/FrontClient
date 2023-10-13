import React from "react";
import { ScrollView, Text, View } from "react-native";
import BaseCard from "../Card/BaseCard";
import CommandCard from "../Card/CommandCard";
import SearchBar from "../Search/SearchBar";

const RestaurantList = [
  {
    name: "KFC",
    subtitle: "Fast Food",
    picture: require("../../../assets/kfc.jpg"),
  },
  {
    name: "McDonalds",
    subtitle: "Fast Food",
    picture: require("../../../assets/mcdo.jpg"),
  },
  {
    name: "TacosNaan",
    subtitle: "Fast Food",
    picture: require("../../../assets/resto1.jpg"),
  },
  {
    name: "KFC",
    subtitle: "Fast Food",
    picture: require("../../../assets/resto1.jpg"),
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        alignSelf: "center",
        marginTop: 10,
        backgroundColor: "white",
      }}
      stickyHeaderIndices={[0]}
    >
      <View style={{ backgroundColor: "white" }}>
        <SearchBar placeholder="Rechercher un restaurant" />
      </View>
      <View style={{ borderWidth: 0.5, borderColor: "grey" }} />
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <CommandCard
          title="Votre derniere commande"
          nbCommandes={1}
          foodPlaceName="KFC"
          description={[{ name: "Poulet", quantity: 1 }]}
          price={0}
        />
      </View>
      {RestaurantList.map((restaurant, index) => {
        return (
          <BaseCard
            key={index}
            title={restaurant.name}
            subtitle={restaurant.subtitle}
            picture={restaurant.picture}
          />
        );
      })}
      {/* <BaseButton text="Ajouter au panier" onPress={() => {}} /> */}
    </ScrollView>
  );
}
