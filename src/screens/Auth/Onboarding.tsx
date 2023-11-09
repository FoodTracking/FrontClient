import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ImageBackground,
  StyleProp,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Palette } from "../../../styles/colors";
import Fonts from "../../../styles/fonts";
import { gutters } from "../../../styles/main";
import BaseButton from "../../components/Button/BaseButton";
import { AuthStackParamList } from "../../navigation/AuthStack";

type OnboardingScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Onboarding"
>;

type Props = {
  navigation: OnboardingScreenNavigationProp;
};

export default function Onboarding({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  // React.useEffect(() => {
  //   if (profile && !profile?.hasCompletedRegistration) {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "Register", params: { initialPage: 1 } }],
  //     });
  //   }
  // }, []);

  const onPressLogin = async () => {
    navigation.navigate("Login", { email: "", password: "" });
  };
  const onPressRegister = () => {
    navigation.navigate("Register", { email: "", password: "" });
  };

  //

  return (
    <ImageBackground
      source={require("../../../assets/onboarding.png") as any}
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style="dark" />
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            paddingBottom: Math.max(insets.bottom, 20),
            paddingTop: 40,
            width: "100%",
            alignItems: "center",
            paddingHorizontal: gutters,
            backgroundColor: "transparent",
          }}
        >
          <Text
            style={
              {
                ...Fonts.semibold(21, Palette.white),
                marginBottom: 10,
                textAlign: "center",
              } as StyleProp<TextStyle>
            }
          >
            Bienvenue sur l'application FollowFood
          </Text>
          <Text
            style={
              {
                ...Fonts.regular(16, Palette.white),
                marginBottom: 20,
                textAlign: "center",
              } as StyleProp<TextStyle>
            }
          >
            Suivez vos plats en temps réel
          </Text>
          <BaseButton
            title="Se connecter"
            onPress={onPressLogin}
            style={{ marginBottom: 10 }}
          />
          <BaseButton
            title="S'inscrire"
            onPress={onPressRegister}
            style={{ marginBottom: 10 }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
