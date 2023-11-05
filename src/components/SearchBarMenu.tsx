import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const SearchBarWithMenu = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    // Add your menu items here
  ]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item: string) => {
    // Handle menu item click here, e.g., navigate to a different screen
    console.log(`Clicked on: ${item}`);
    toggleMenu();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={toggleMenu}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>

      {isMenuOpen && (
        <View style={styles.menu}>
          <FlatList
            data={menuItems}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMenuItemClick(item)}>
                <Text style={styles.menuItem}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
  },
  searchButton: {
    padding: 8,
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginLeft: 10,
  },
  menu: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  menuItem: {
    padding: 10,
  },
});

export default SearchBarWithMenu;
