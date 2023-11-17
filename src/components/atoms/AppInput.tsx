import React from "react";
import { TextInput } from "react-native";

interface BaseInputProps {
  placeholder: string;
  style?: undefined | object;
  value: string;
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
  onBlur?: () => void;
}

export default function AppInput({
  placeholder,
  style,
  value,
  onChange,
  onBlur,
  secureTextEntry,
}: BaseInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      style={{
        padding: 13,
        borderWidth: 0.5,
        borderColor: "black",
        borderRadius: 6,
        width: "100%",
        ...style,
      }}
      value={value}
      onBlur={onBlur}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
    />
  );
}
