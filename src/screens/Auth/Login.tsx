import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";

import { Palette } from "../../../styles/colors";
import BaseButton from "../../components/Button/BaseButton";
import BaseInput from "../../components/Input/BaseInput";
import { useAuthContext } from "../../hooks/useAuthContext";
import { axiosInstance } from "../../lib/api/api";
import { AuthStackParamList } from "../../navigation/AuthStack";

type OnboardingScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

export default function LoginScreen() {
  const { setIsAuthenticated } = useAuthContext();
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({});

  const storeData = async (accessToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      console.log("LOG FROM LOGIN: TOKEN STORED");

      AsyncStorage.getItem("accessToken").then((value) => {
        console.log("LOG FROM LOGIN: ACCESSTOKEN STORED", value);
      });

      AsyncStorage.getItem("refreshToken").then((value) => {
        console.log("LOG FROM LOGIN: REFRESHTOKEN STORED", value);
      });
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.status !== 201) return;

      setIsAuthenticated(true);
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
    const { email, password } = getValues();
    navigation.navigate("Register", { email, password });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Palette.white }}>
      <Image
        source={require("../../../assets/logo.png")}
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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BaseInput
              style={{
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                marginTop: 30,
                marginHorizontal: 30,
              }}
              placeholder="Adresse Mail"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BaseInput
              style={{
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                marginTop: 30,
                marginHorizontal: 30,
              }}
              placeholder="Mot de passe"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && <Text>This is required.</Text>}

        <BaseButton
          style={{ alignSelf: "center", marginTop: 20 }}
          title="Se connecter"
          onPress={handleSubmit((data) => handleLogin(data))}
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
