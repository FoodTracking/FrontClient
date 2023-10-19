import React from "react";
import { Text, TextInput, View } from "react-native";

export default function BaseInput({
  placeholder,
  style,
  value,
  onChangeText,
}: {
  placeholder: string;
  style?: unknown;
  value: string;
  onChangeText: unknown;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={style}
      value={value}
      onChangeText={onChangeText}
      style={{
        backgroundColor: "white",
        margin: 10,
        paddingLeft: 10,
        height: 25,
        borderWidth: 0.5,
        borderColor: "black",
        borderRadius: 100,
      }}
    ></TextInput>
  );
}
