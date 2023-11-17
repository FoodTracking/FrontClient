import { ListItem, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

interface AppCheckboxListProps {
  options: AppCheckboxListOption[];
  value: string[];
  onSelect: (value: string) => void;
}

interface AppCheckboxListOption {
  id: string;
  name: string;
}

const AppCheckboxList: React.FC<AppCheckboxListProps> = ({
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

export default AppCheckboxList;
