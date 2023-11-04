import { Motion } from "@legendapp/motion";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableWithoutFeedback, ViewStyle } from "react-native";

import { Palette } from "../../../styles/colors";
import { customResponsiveWidth } from "../../../styles/helpers/helpers";

type SwitchProps = {
  selected?: boolean;
  setSelected?: () => void;
  containerStyle?: ViewStyle;
};

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function Switch({
  selected,
  setSelected = () => {},
  containerStyle = {},
}: SwitchProps) {
  const animation = useRef<Animated.Value>(new Animated.Value(0)).current;

  const prevSelected = usePrevious<boolean | undefined>(selected || undefined);

  useEffect(() => {
    if (prevSelected !== selected) {
      Animated.timing(animation, {
        useNativeDriver: false,
        toValue: selected ? 1 : 0,
        duration: 250,
      }).start();
    }
  }, [selected, prevSelected, animation]);

  return (
    <TouchableWithoutFeedback onPress={setSelected}>
      <Motion.View
        animate={{
          backgroundColor: selected ? Palette.red : Palette.grey,
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: customResponsiveWidth(14),
          padding: 4,
          borderRadius: 50,
          ...containerStyle,
        }}
      >
        <Motion.View
          initial={{ y: 0 }}
          animate={{ x: selected ? customResponsiveWidth(6) : 0, y: 0 }}
          style={{
            width: customResponsiveWidth(6),
            height: customResponsiveWidth(6),
            backgroundColor: Palette.white,
            borderRadius: 50,
          }}
        />
      </Motion.View>
    </TouchableWithoutFeedback>
  );
}
