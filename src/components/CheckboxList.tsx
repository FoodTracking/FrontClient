import { ListItem, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

interface SingleChoiceProps {
  options: { id: string; name: string }[];
  value: string[];
  onSelect: (value: string) => void;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({
  options,
  value,
  onSelect,
}) => {
  return (
    <View>
      {options.map((category, index) => (
        <ListItem.CheckBox
          key={index}
          title={<Text style={{ fontSize: 18 }}>{category.name}</Text>}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={"checkbox-blank-outline"}
          size={28}
          checked={value?.includes(category.id)}
          onPress={() => onSelect(category.id)}
        />
      ))}
    </View>
  );
};

export default SingleChoice;
