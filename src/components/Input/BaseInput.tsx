import React from "react";
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

interface BaseInputProps {
  placeholder: string;
  style?: undefined | object;
  value: string;
<<<<<<< HEAD
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
=======
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
>>>>>>> f521816 (update : Register base)
}

export default function BaseInput({
  placeholder,
  style,
  value,
  onChange,
  secureTextEntry,
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
<<<<<<< HEAD
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
=======
      onChange={onChange}
>>>>>>> f521816 (update : Register base)
    />
  );
}
