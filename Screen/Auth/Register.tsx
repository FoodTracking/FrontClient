import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import BaseButton from "../../src/components/Button/BaseButton";
import { useNavigation } from "@react-navigation/native";
import BaseInput from "../../src/components/Input/BaseInput";
import { Palette } from "../../styles/colors";
import { RootStackParamList } from "../../src/components/navigation/AuthStack";
import { StackNavigationProp } from "@react-navigation/stack";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

export default function RegisterScreen({
  updateAccess,
}: {
  updateAccess: (access: boolean) => void;
}) {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const onPressLogin = async () => {
    navigation.navigate("Login", { email: "", password: "" });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Palette.white }}>
      <Image
        source={require("../../assets/logo.png")}
        style={{
          alignSelf: "center",
          marginTop: 50,
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          alignSelf: "center",
          fontSize: 30,
          marginBottom: 50,
        }}
      >
        Inscription
      </Text>
      <View style={{ marginHorizontal: 50 }}>
        <BaseInput
          style={{
            height: "5%",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal: 30,
          }}
          placeholder="Adresse Mail"
          value=""
          onChange={() => {}}
        />
      </View>
      <View style={{ marginHorizontal: 50 }}>
        <BaseInput
          style={{
            height: "5%",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal: 30,
          }}
          placeholder="Password"
          value=""
          onChange={() => {}}
        />
      </View>
      <BaseButton
        style={{ alignSelf: "center", marginTop: 20 }}
        title="S'inscrire"
        onPress={() => {
          alert("Inscription");
          updateAccess(true);
        }}
      />
      <Pressable
        style={{
          alignSelf: "center",
          marginTop: 20,
          marginBottom: 30,
        }}
        onPress={() => {
          onPressLogin();
        }}
      >
        <Text>Vous avez déjà un compte ?</Text>
        <Text style={{ color: "blue", textAlign: "center" }}>
          Connectez-vous
        </Text>
      </Pressable>
    </View>
  );
}
