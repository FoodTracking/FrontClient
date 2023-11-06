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

const BottomSheetTest = ({ open }: { open: boolean }) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const b = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => <BottomSheetBackdrop {...props} />,
    [],
  );

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [open]);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // renders
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
        Filtrer par catégories
      </Text>
      <BottomSheetScrollView>
        <SingleChoice options={b.data!} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default BottomSheetTest;
