import React from "react";
import { TextInput } from "react-native";

interface BaseInputProps {
  placeholder: string;
  style?: object;
  value: string;
  onChange: (text: string) => void;
}

export default function BaseInput({
  placeholder,
  style,
  value,
  onChange,
}: BaseInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      style={{
        backgroundColor: "white",
        margin: 10,
        paddingLeft: 10,
        height: 25,
        borderWidth: 0.5,
        borderColor: "black",
        borderRadius: 100,
        ...style,
      }}
      value={value}
      onChangeText={onChange}
    />
  );
}
