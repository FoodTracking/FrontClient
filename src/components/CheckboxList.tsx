import { CheckBox } from "@rneui/base";
import React, { useState } from "react";
import { View } from "react-native";

interface SingleChoiceProps {
  options: { id: string; name: string }[];
}

const SingleChoice: React.FC<SingleChoiceProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <View>
      {options.map((option) => (
        <CheckBox
          checked={selectedOption === option.id}
          title={option.name}
          onPress={() => setSelectedOption(option.id)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
      ))}
    </View>
  );
};

export default SingleChoice;
