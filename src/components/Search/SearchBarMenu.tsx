import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { debounceTime, of } from "rxjs";

import CategoriesBottomSheet from "../CategoriesBottomSheet";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onChangeCategory: (categories: string[]) => void;
}
const SearchBar = ({ onSearch, onChangeCategory }: SearchBarProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = (text: string) => {
    of(text)
      .pipe(debounceTime(200))
      .subscribe(() => onSearch(text));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for food, groceries, etc."
        onChangeText={handleChange}
      />
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.icon}>
        <AntDesign name="filter" size={24} color="black" />
      </TouchableOpacity>
      <CategoriesBottomSheet
        isOpen={open}
        setIsOpen={setOpen}
        onChange={onChangeCategory}
      />
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
    marginVertical: 10,
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
