import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, View } from "react-native";

import { fetchCategories } from "../../lib/api/api";
import AppCheckboxList from "../atoms/AppCheckboxList";

interface CategoriesBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onChange: (categories: string[]) => void;
}

const CategoriesBottomSheet = ({
  isOpen,
  setIsOpen,
  onChange,
}: CategoriesBottomSheetProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => <BottomSheetBackdrop {...props} />,
    [],
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      // Additional logic for handling closure
      setIsOpen(false);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [isOpen]);

  const handleSelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
      onChange(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
      onChange([...selectedCategories, category]);
    }
  };
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={true}
      onChange={handleSheetChanges}
    >
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          Filtrer par catégories
        </Text>
        <BottomSheetScrollView>
          <AppCheckboxList
            options={data!}
            value={selectedCategories}
            onSelect={handleSelect}
          />
        </BottomSheetScrollView>
      </View>
    </BottomSheetModal>
  );
};

export default CategoriesBottomSheet;
