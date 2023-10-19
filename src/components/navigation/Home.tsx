import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import BaseCard from "../Card/BaseCard";
import CommandCard from "../Card/CommandCard";
import SearchBar from "../Search/SearchBar";
import FilterCard from "../Card/FilterCard";

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

const FilstersList = [
  {
    name: "Fast Food",
    picture: require("../../../assets/resto1.jpg"),
  },
  {
    name: "Sushi",
    picture: require("../../../assets/resto1.jpg"),
  },
  {
    name: "Indien",
    picture: require("../../../assets/resto1.jpg"),
  },
  {
    name: "Italien",
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
        backgroundColor: "green",
        marginTop: 30,
      }}
      stickyHeaderIndices={[0]}
    >
      <View style={{ backgroundColor: "green" }}>
        <SearchBar placeholder="Rechercher un restaurant" />
      </View>
      <View style={{ borderWidth: 0.5, borderColor: "black" }} />
      <FlatList
        horizontal={true}
        data={FilstersList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <FilterCard
            key={index}
            title={item.name}
            picture={item.picture}
            style={{ marginTop: 5, backgroundColor: "white" }}
          />
        )}
      />

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <CommandCard
          title="Votre derniere commande"
          nbCommandes={1}
          foodPlaceName="KFC"
          description={[{ name: "Poulet", quantity: 1 }]}
          price={0}
          style={{ margin: 5, backgroundColor: "white" }}
        />
      </View>
      {RestaurantList.map((restaurant, index) => {
        return (
          <BaseCard
            key={index}
            title={restaurant.name}
            subtitle={restaurant.subtitle}
            picture={restaurant.picture}
            style={{ marginTop: 5, backgroundColor: "white" }}
          />
        );
      })}
      {/* <BaseButton text="Ajouter au panier" onPress={() => {}} /> */}
    </ScrollView>
  );
}
