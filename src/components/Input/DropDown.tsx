import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { fetchCategories } from "../../lib/api/api";

type DropdownComponentProps = {
  value?: string;
  onSelect: (value: string) => void;
};
export default function DropdownComponent({
  value,
  onSelect,
}: DropdownComponentProps) {
  const [v, setV] = useState<string | undefined>(value);
  const { isError, isLoading, error, data, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleSelect = (selectedItem: { label: string; value: string }) => {
    const selectedValue = selectedItem.value || "";
    setV(selectedValue);
    onSelect(selectedValue);
  };

  useEffect(() => {
    setV(value);
    alert(value);
  }, [value]);

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

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error :(</Text>;

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={
          data?.map((category) => ({
            label: category.name,
            value: category.id,
          })) ?? []
        }
        maxHeight={300}
        labelField={"label"}
        valueField={"value"}
        placeholder={!isFocus ? "Catégorie" : "..."}
        searchPlaceholder="Search..."
        value={v}
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
