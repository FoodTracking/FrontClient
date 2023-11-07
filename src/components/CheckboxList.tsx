import { CheckBox } from "@rneui/base";
import React, { useState } from "react";
import { View } from "react-native";

interface SingleChoiceProps {
  options: { id: string; name: string }[];
  onChange: (option: string) => void;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handlePress = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <View>
      {options.map((option) => (
        <CheckBox
          key={option.id}
          checked={selectedOption === option.id}
          title={option.name}
          onPress={() => handlePress(option.id)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
      ))}
    </View>
  );
};

export default SingleChoice;
