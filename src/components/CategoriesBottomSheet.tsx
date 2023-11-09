import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Text } from "react-native";

import SingleChoice from "./CheckboxList";
import { fetchCategories } from "../lib/api/api";

interface CategoriesBottomSheetProps {
  isOpen: boolean;
  onChange: (query: string) => void;
}

const CategoriesBottomSheet = ({
  isOpen,
  onChange,
}: CategoriesBottomSheetProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => <BottomSheetBackdrop {...props} />,
    [],
  );

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

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={true}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 22,
          marginLeft: 20,
          marginBottom: 5,
        }}
      >
        Filtrer par catégorie
      </Text>
      <BottomSheetScrollView>
        <SingleChoice options={data!} onChange={onChange} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default CategoriesBottomSheet;
