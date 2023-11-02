import React from "react";
import {
  Alert,
  ImageBackground,
  Text,
  View,
  TextStyle,
  StyleProp,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Fonts from "../../styles/fonts";
import { Palette } from "../../styles/colors";
import BaseButton from "../../src/components/Button/BaseButton";
import { gutters } from "../../styles/main";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../src/components/navigation/AuthStack";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
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
      source={require("../../assets/onboarding.png") as any}
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
