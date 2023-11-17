import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";

import AppButton from "./AppButton";

interface CountInputProps {
  value?: number;
  onChange: (value: number) => void;
}

export default function AppCounterInput({ value, onChange }: CountInputProps) {
  const [count, setCount] = useState(value ?? 0);

  const handleCountChange = (value: number) => {
    if (count === 0 && value < 1) return;
    setCount((prev) => prev + value);
    onChange(count + value);
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
        width: 50,
      }}
    >
      <AppButton size={"sm"} onPress={() => handleCountChange(-1)}>-</AppButton>
      <Input
        editable={false}
        disabled={false}
        value={count.toString()}
        textAlign={"center"}
        inputContainerStyle={{ alignSelf: "flex-start", borderBottomWidth: 0 }}
      />
      <AppButton size={"sm"} onPress={() => handleCountChange(1)}>+</AppButton>
    </View>
  );
}
