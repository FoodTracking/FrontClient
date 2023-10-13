import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import BaseButton from "../../src/components/Button/BaseButton";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
      <View
        style={{
          height: "5%",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 10,
          marginHorizontal: 30,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontSize: 15,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 2,
          }}
          placeholder="Adresse Mail"
        />
      </View>
      <View
        style={{
          height: "5%",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 10,
          marginTop: 30,
          marginHorizontal: 30,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontSize: 15,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 2,
          }}
          placeholder="Password"
        />
      </View>
      <BaseButton
        style={{ alignSelf: "center", marginTop: 20 }}
        text="Se connecter"
        onPress={() => {
          alert("Connexion");
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
        <Text style={{ color: "blue" }}>Inscrivez-vous</Text>
      </Pressable>
    </View>
  );
}
