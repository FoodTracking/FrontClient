import { Button, ButtonProps } from "@rneui/themed";
import React, { PropsWithChildren } from "react";

interface AppButtonProps extends ButtonProps {
  onPress: () => void;
}

export default function AppButton({
  onPress,
  children,
  ...props
}: PropsWithChildren<AppButtonProps>) {
  return (
    <Button
      title={props.title}
      titleStyle={{ color: "white", fontSize: 14 }}
      buttonStyle={{
        height: 45,
        borderRadius: 6,
        width: "100%",
      }}
      onPress={onPress}
      {...props}
    >
      {children}
    </Button>
  );
}
