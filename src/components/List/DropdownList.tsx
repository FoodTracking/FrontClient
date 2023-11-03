import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const category = [
  {
    value: "c81cccc8-987f-4ec0-945e-445ce43fda67",
    label: "Japonais",
  },
  {
    value: "7eff56e7-1237-498e-a36c-e6f25763d5d7",
    label: "Fast-food",
  },
  {
    value: "b7b15fc8-5f78-4ad3-8827-94b87039348c",
    label: "Français",
  },
  {
    value: "af075beb-69f4-42a1-9f1d-f8a4fcc05ba7",
    label: "Indien",
  },
  {
    value: "b32a4da0-3fdf-4dff-95fa-ca3e41699c0a",
    label: "Sushi",
  },
];
type DropdownComponentProps = {
  onSelect: (value: string) => void;
};
export default function DropdownComponent({
  onSelect,
}: DropdownComponentProps) {
  const [value, setValue] = useState("");

  const handleSelect = (selectedItem: { label: string; value: string }) => {
    const selectedValue = selectedItem.value || "";
    console.log(selectedValue);
    setValue(selectedValue);
    onSelect(selectedValue);
  };

  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Catégorie
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={category as []}
        maxHeight={300}
        labelField={"label" as any}
        valueField={"value" as any}
        placeholder={!isFocus ? "Catégorie" : "..."}
        searchPlaceholder="Search..."
        value={value as any}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleSelect}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="tago"
            size={20}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
