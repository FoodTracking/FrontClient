import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Skeleton } from "@rneui/base";
import { Button, Image, Text } from "@rneui/themed";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SafeAreaView, View } from "react-native";

import AppCounterInput from "../atoms/AppCounterInput";
import AppButton from "../atoms/AppButton";
import { Product } from "../../types";

interface BottomSheetProductProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onChange?: (value: number) => void;
  product: Product;
  quantity?: number;
}

export const BottomSheetProduct = ({
  isOpen,
  setOpen,
  onChange,
  product,
  quantity,
}: BottomSheetProductProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["65%", "65%"], []);

  useEffect(() => {
    if (isOpen) bottomSheetModalRef.current?.present();
    else bottomSheetModalRef.current?.dismiss();
  }, [isOpen]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      // Additional logic for handling closure
      setOpen(false);
    }
  }, []);

  const handleQuantityChange = (value: number) => {
    onChange && onChange(value);
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
      onChange={handleSheetChanges}
      handleComponent={() => null}
    >
      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "90%",
        }}
      >
        <View>
          <Image
            source={{ uri: product?.image }}
            PlaceholderContent={
              <Skeleton style={{ height: "100%", width: "100%" }} />
            }
            containerStyle={{
              width: "100%",
              height: 165,
              borderTopEndRadius: 14,
              borderTopStartRadius: 14,
            }}
            resizeMode={"cover"}
          />
          <Text h2>{product.name}</Text>
          <Text h3>{product.price} €</Text>
          <Text>{product.description}</Text>

          <AppCounterInput value={quantity} onChange={handleQuantityChange} />
        </View>
        <AppButton title={"Valider"} onPress={() => setOpen(false)} />
      </SafeAreaView>
    </BottomSheetModal>
  );
};

export default BottomSheetProduct;
