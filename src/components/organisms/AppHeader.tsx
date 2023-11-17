import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationProp } from "@react-navigation/native";
import { Divider, Text } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, View } from "react-native";

import { MainStackParamList } from "../../navigation/MainStack";
import { ProfileOrderParamList } from "../../navigation/ProfileOrdersStack";

interface AppHeaderProps {
  title: string | React.ReactElement;
  navigation:
    | NavigationProp<MainStackParamList>
    | NavigationProp<ProfileOrderParamList>;
}

export const AppHeader = ({
  title,
  navigation,
  children,
}: PropsWithChildren<AppHeaderProps>) => {
  return (
    <>
      <View
        style={{
          display: "flex",
          width: "100%",
          paddingHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 18 }}>{title}</Text>

        {children}
      </View>
      <Divider />
    </>
  );
};

export default AppHeader;
