import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import BaseCard from "../src/components/Card/BaseCard";
import CommandCard from "../src/components/Card/CommandCard";
import SearchBar from "../src/components/Search/SearchBar";
import FilterCard from "../src/components/Card/FilterCard";
import { Palette } from "../styles/colors";

const RestaurantList = [
  {
    name: "KFC",
    category: "Fast Food",
    picture: require("../assets/kfc.jpg"),
  },
  {
    name: "McDonalds",
    category: "Fast Food",
    picture: require("../assets/mcdo.jpg"),
  },
  {
    name: "TacosNaan",
    category: "Fast Food",
    picture: require("../assets/resto1.jpg"),
  },
  {
    name: "KFC",
    category: "Fast Food",
    picture: require("../assets/resto1.jpg"),
  },
];

const FilstersList = [
  {
    name: "Fast Food",
    picture: require("../assets/resto1.jpg"),
  },
  {
    name: "Sushi",
    picture: require("../assets/resto1.jpg"),
  },
  {
    name: "Indien",
    picture: require("../assets/resto1.jpg"),
  },
  {
    name: "Italien",
    picture: require("../assets/resto1.jpg"),
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        alignSelf: "center",
        marginTop: 30,
        backgroundColor: Palette.lightGrey,
      }}
      stickyHeaderIndices={[0]}
    >
      <View style={{ backgroundColor: Palette.lightGrey }}>
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
            name={restaurant.name}
            category={restaurant.category}
            picture={restaurant.picture}
            style={{ marginTop: 5, backgroundColor: "white" }}
          />
        );
      })}
      {/* <BaseButton text="Ajouter au panier" onPress={() => {}} /> */}
    </ScrollView>
  );
}
