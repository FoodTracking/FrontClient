import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";

export default function SearchBar({
  placeholder,
  style,
}: {
  placeholder: string;
  style?: any;
}) {
  return (
    <Pressable
      style={{
        margin: 15,
        height: 25,
        borderWidth: 0.5,
        borderColor: "grey",
        borderRadius: 100,
        flexDirection: "row",
        ...style,
      }}
    >
      <AntDesign
        name="search1"
        size={18}
        color="black"
        style={{ marginLeft: 10, marginTop: 2 }}
      />
      <TextInput
        placeholder={placeholder}
        style={{
          flex: 1,
          fontSize: 15,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 2,
        }}
      ></TextInput>
      <Pressable onPress={() => {}}>
        <Feather
          name="filter"
          size={18}
          color="black"
          style={{ marginRight: 10, marginTop: 2 }}
        />
      </Pressable>
    </Pressable>
  );
}
