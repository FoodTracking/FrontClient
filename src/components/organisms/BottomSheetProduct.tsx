import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Skeleton } from "@rneui/base";
import { Image, Text } from "@rneui/themed";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SafeAreaView, View } from "react-native";

import { Product } from "../../types";
import AppButton from "../atoms/AppButton";
import AppCounterInput from "../atoms/AppCounterInput";

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
              borderRadius: 14,
            }}
            resizeMode={"cover"}
          />
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            {product.name}
            <Text h3> {product.price} €</Text>
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "grey",
              marginVertical: 10,
            }}
          />
          <Text style={{ paddingHorizontal: 10 }}>{product.description}</Text>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: "grey",
              marginVertical: 10,
            }}
          />
          <View style={{ marginTop: 20, paddingHorizontal: "33%" }}>
            <AppCounterInput value={quantity} onChange={handleQuantityChange} />
          </View>
          <View style={{ marginTop: 10 }}>
            <AppButton title={"Valider"} onPress={() => setOpen(false)} />
          </View>
        </View>
      </SafeAreaView>
    </BottomSheetModal>
  );
};

export default BottomSheetProduct;
