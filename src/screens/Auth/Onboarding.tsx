import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "@rneui/themed";
import React from "react";
import { ImageBackground, SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Palette } from "../../../styles/colors";
import { gutters } from "../../../styles/main";
import AppButton from "../../components/atoms/AppButton";
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

  const onPressLogin = async () => {
    navigation.navigate("Login", { email: "", password: "" });
  };
  const onPressRegister = () => {
    navigation.navigate("Register", { email: "", password: "" });
  };

  //

  return (
    <ImageBackground
      source={require("../../../assets/onboarding.png")}
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: Math.max(insets.bottom, 20),
            paddingTop: 40,
            width: "100%",
            alignItems: "center",
            paddingHorizontal: gutters,
            backgroundColor: "transparent",
          }}
        >
          <View style={{ marginTop: 80 }}>
            <Text
              h3
              style={{
                color: Palette.white,
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Bienvenue sur l'application FollowFood
            </Text>
            <Text
              h4
              style={{
                color: Palette.white,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Suivez vos plats en temps réel
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 10,
              width: "100%",
            }}
          >
            <AppButton
              title="Se connecter"
              onPress={onPressLogin}
              style={{ marginBottom: 10 }}
            />
            <AppButton
              title="S'inscrire"
              onPress={onPressRegister}
              style={{ marginBottom: 10 }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
