import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import BottomSheetTest from "../BottomSheetTest";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}
const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for food, groceries, etc."
        onChangeText={(text) => onSearch && onSearch(text)}
      />
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.icon}>
        <AntDesign name="filter" size={24} color="black" />
      </TouchableOpacity>
      <BottomSheetTest open={open} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  icon: {
    padding: 10,
  },
});

export default SearchBar;
