import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import BaseButton from "../../src/components/Button/BaseButton";
import { useNavigation } from "@react-navigation/native";
import BaseInput from "../../src/components/Input/BaseInput";
import { Palette } from "../../styles/colors";
import { RootStackParamList } from "../../src/components/navigation/AuthStack";
import { StackNavigationProp } from "@react-navigation/stack";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen({
  updateAccess,
}: {
  updateAccess: (access: boolean) => void;
}) {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = async () => {
    navigation.navigate("Register", { email: "", password: "" });
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
        Connexion
      </Text>
      <View style={{ marginHorizontal: 50 }}>
        <BaseInput
          style={{
            height: "10%",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal: 30,
          }}
          placeholder="Adresse Mail"
          value={email}
          onChange={(text: string) => setEmail(text)}
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
          value={password}
          onChange={(text: string) => setPassword(text)}
        />
      </View>
      <BaseButton
        style={{ alignSelf: "center", marginTop: 20 }}
        title="Se connecter"
        onPress={() => {
          alert("Connexion");
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
          onPressLogin;
        }}
      >
        <Text>Pas encore inscrit ?</Text>
        <Text style={{ color: "blue", textAlign: "center" }}>
          Inscrivez-vous
        </Text>
      </Pressable>
    </View>
  );
}
