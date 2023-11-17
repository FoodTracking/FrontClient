import React, { useState } from "react";

import ProductCard from "./ProductCard";
import { Product } from "../../types";
import BottomSheetProduct from "./BottomSheetProduct";

interface ProductCardWithBottomSheetProps {
  product: Product;
  quantity?: number;
  onChange?: (value: number) => void;
}

export default function ProductCardWithBottomSheet({
  product,
  quantity,
  onChange,
}: ProductCardWithBottomSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProductCard product={product} onPress={() => setOpen(true)} />
      <BottomSheetProduct
        isOpen={open}
        setOpen={setOpen}
        product={product}
        quantity={quantity}
        onChange={onChange}
      />
    </>
  );
}
