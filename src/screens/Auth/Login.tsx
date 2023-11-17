import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "@rneui/themed";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, SafeAreaView, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import AppButton from "../../components/atoms/AppButton";
import AppInput from "../../components/atoms/AppInput";
import { useAuthContext } from "../../hooks/useAuthContext";
import { login } from "../../lib/api/api";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { Login, Tokens } from "../../types";

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
  } = useForm<Login>();

  const mutation = useMutation({
    mutationFn: async (data: Login) => login(data),
    onSuccess: async (tokens: Tokens) => {
      showMessage({
        message: "Vous êtes connecté",
        type: "success",
      });
      await AsyncStorage.setItem("accessToken", tokens.accessToken);
      await AsyncStorage.setItem("refreshToken", tokens.refreshToken);
      setIsAuthenticated(true);
    },
    onError: () => {
      showMessage({
        message: "Les identifiants sont incorrects",
        type: "danger",
      });
    },
  });

  const onPressLogin = async () => {
    const { email, password } = getValues();
    navigation.navigate("Register", { email, password });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../../assets/logo.png")}
        style={{
          alignSelf: "center",
          marginTop: 40,
          width: 220,
          height: 220,
        }}
      />

      <Text
        h3
        style={{
          alignSelf: "center",
        }}
      >
        Connexion
      </Text>

      <View style={{ margin: 50, gap: 25 }}>
        <Controller
          control={control}
          rules={{
            required: "Un email est requis",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "L'email doit être valide",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              placeholder="Adresse Mail"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && <Text>{errors.email.message}</Text>}

        <Controller
          control={control}
          rules={{
            required: "Mot de passe requis",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/,
              message:
                "Le mot de passe doit contenir au moins : \n 1 Majuscule \n 1 Minuscule \n 1 Chiffre \n 1 Caractère spécial \n 12 Caractères minimum",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              placeholder="Mot de passe"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        {errors.password && <Text>{errors.password.message}</Text>}

        <AppButton
          title="Se connecter"
          onPress={handleSubmit((data) => mutation.mutate(data))}
        />
        <Pressable
          style={{
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 30,
          }}
          onPress={onPressLogin}
        >
          <Text>Pas encore inscrit ?</Text>
          <Text style={{ color: "blue", textAlign: "center" }}>
            Inscrivez-vous
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
