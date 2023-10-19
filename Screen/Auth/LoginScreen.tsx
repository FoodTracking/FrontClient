import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import BaseButton from "../../src/components/Button/BaseButton";
import { useNavigation } from "@react-navigation/native";
import BaseInput from "../../src/components/Input/BaseInput";

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      <Image
        source={require("../../assets/followfood.png")}
        style={{
          alignSelf: "center",
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
            height: "5%",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal: 30,
          }}
          placeholder="Adresse Mail"
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
        />
      </View>
      <BaseButton
        style={{ alignSelf: "center", marginTop: 20 }}
        text="Se connecter"
        onPress={() => {
          alert("Connexion");
          navigation.navigate("Home");
        }}
      />
      <Pressable
        style={{
          alignSelf: "center",
          marginTop: 20,
          marginBottom: 30,
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
