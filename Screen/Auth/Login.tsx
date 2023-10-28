import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import BaseButton from "../../src/components/Button/BaseButton";
import { useNavigation } from "@react-navigation/native";
import BaseInput from "../../src/components/Input/BaseInput";
import { Palette } from "../../styles/colors";
import { RootStackParamList } from "../../src/components/navigation/AuthStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";
import Switch from "../../src/components/Button/Switch";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen({
  updateAccess,
  jwt,
}: {
  updateAccess: (access: boolean) => void;
  jwt: string;
}) {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const storeData = async (accessToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      console.log("LOG FROM LOGIN: TOKEN STORED");
      axios.defaults.headers.common["Authorization"] = accessToken;

      AsyncStorage.getItem("accessToken").then((value) => {
        console.log("LOG FROM LOGIN: REFRESHTOKEN STORED", value);
      });

      AsyncStorage.getItem("refreshToken").then((value) => {
        console.log("LOG FROM LOGIN: REFRESHTOKEN STORED", value);
      });
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://api.follow-food.alexandre-pezat.fr/auth/login",
        {
          email: email,
          password: password,
        }
      );
      updateAccess(true);
      //
      // // console.log("LOG FROM LOGIN ", JSON.stringify(response.data));
      // console.log("LOG FROM LOGIN ", JSON.stringify(response.data.accessToken));
      // console.log(
      //   "LOG FROM LOGIN: RefreshToken ",
      //   JSON.stringify(response.data.refreshToken)
      // );
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      storeData(accessToken, refreshToken);
    } catch (error) {
      console.error("An error occurred during login:", error);
      console.log("LOG FROM LOGIN ", JSON.stringify(error));
    }
  };

  const onPressLogin = async () => {
    navigation.navigate("Register", { email: email, password: password });
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
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal: 30,
          }}
          placeholder="Adresse Mail"
          value={email}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setEmail(event.nativeEvent.text)
          }
        />
        <View style={{ marginHorizontal: 50 }}>
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 30,
              marginHorizontal: 30,
            }}
            placeholder="Password"
            value={password}
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setPassword(event.nativeEvent.text)
            }
          />
        </View>
        <BaseButton
          style={{ alignSelf: "center", marginTop: 20 }}
          title="Se connecter"
          onPress={() => {
            alert("Connexion");
            handleLogin();
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
          <Text>Pas encore inscrit ?</Text>
          <Text style={{ color: "blue", textAlign: "center" }}>
            Inscrivez-vous
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
