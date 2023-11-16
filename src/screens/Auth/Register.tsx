import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";

import { Palette } from "../../../styles/colors";
import BaseButton from "../../components/Button/BaseButton";
import Switch from "../../components/Button/Switch";
import BaseInput from "../../components/Input/BaseInput";
import DropdownComponent from "../../components/Input/DropDown";
import { useAuthContext } from "../../hooks/useAuthContext";
import { axiosInstance } from "../../lib/api/api";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { CreateIdentityDto } from "../../types";

type OnboardingScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Register"
>;

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  namePro: string;
  description: string;
  addresse: string;
  category: string;
  role: string;
};

export default function RegisterScreen() {
  const { setIsAuthenticated } = useAuthContext();
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({});

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("OK");
    console.log("data", data);
    if (!isSelected) {
      try {
        const response = await axiosInstance.post("/auth/register", {
          user: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          email: data.email,
          password: data.password,
          role: "user",
        });
        console.log("LOG FROM REGISTER ", JSON.stringify(response));
        setIsAuthenticated(true);
        console.log("LOG FROM REGISTER ", JSON.stringify(response.data));
      } catch (error) {
        console.error("An error occurred during USER registration:", error);
        console.log(
          "An error occurred during USER registration:",
          (error as AxiosError)?.response?.data
        );
        const requestData = {
          user: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          email: data.email,
          password: data.password,
          role: "user",
        };
        console.error("request data", requestData);
      }
    } else {
      try {
        const dataIdResto: CreateIdentityDto = {
          email: data?.email,
          password: data?.password,
          role: "restaurant",
          restaurant: {
            name: data?.namePro,
            description: data?.description,
            address: data?.addresse,
            categoryId: data?.category,
          },
        };
        const response = await axiosInstance.post<CreateIdentityDto>(
          "/auth/register",
          dataIdResto
        );

        setIsAuthenticated(true);
        // Update the access after successful registration
        console.log("LOG FROM REGISTER ", JSON.stringify(response.data)); // Log the response data for debugging
      } catch (error) {
        console.error("An error occurred during USER registration:", error);
        console.log(
          "An error occurred during USER registration:",
          (error as AxiosError)?.response?.data
        );
        const data = JSON.parse((error as AxiosError)?.config?.data);
        console.error("request data", data);
      }
    }
  };

  const [isSelected, setIsSelected] = useState(false);
  const [role, setRole] = useState("user");

  return (
    <View style={{ flex: 1, backgroundColor: Palette.white }}>
      <Image
        source={require("../../../assets/logo.png")}
        style={{
          alignSelf: "center",
          marginTop: 10,
          width: 100,
          height: 100,
        }}
      />
      <Text
        style={{
          alignSelf: "center",
          fontSize: 15,
        }}
      >
        Inscription
      </Text>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 10,
          fontSize: 14,
        }}
      >
        Vous êtes un : {isSelected ? "Restaurateur" : "Particulier"}
      </Text>
      <Switch
        setSelected={() => {
          setIsSelected(!isSelected);
          if (isSelected) {
            setRole("restaurant");
          } else {
            setRole("user");
          }
        }}
        selected={isSelected}
        containerStyle={{
          alignSelf: "center",
          marginTop: 10,
        }}
      />

      {!isSelected ? (
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="First name"
                onChange={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>Prénom requis</Text>}
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="Last name"
                onChange={onChange}
                value={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text>Nom de famille requis</Text>}
          <Controller
            control={control}
            rules={{
              required: "Un email est requis",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "L'email doit être valide",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="Email"
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
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="Password"
                onChange={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && <Text>{errors.password.message}</Text>}
        </View>
      ) : (
        <View>
          <Controller
            control={control}
            rules={{
              required: "Un email est requis",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "L'email doit être valide",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="Email"
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
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="Password"
                onChange={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && <Text>{errors.password.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <BaseInput placeholder="Name" onChange={onChange} value={value} />
            )}
            name="namePro"
          />
          {errors.namePro && <Text>Nom requis</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="Description"
                onChange={onChange}
                value={value}
              />
            )}
            name="description"
          />
          {errors.description && <Text>Description requise</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="Address"
                onChange={onChange}
                value={value}
              />
            )}
            name="addresse"
          />
          {errors.addresse && <Text>Adresse requise</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <DropdownComponent onSelect={onChange} />
            )}
            name="category"
          />
          {errors.category && <Text>Catégorie requise</Text>}
        </View>
      )}

      <BaseButton
        style={{ alignSelf: "center", marginTop: 20 }}
        title="S'inscrire"
        onPress={() => {
          handleSubmit(onSubmit)();
        }}
      />
      <Pressable
        style={{
          alignSelf: "center",
          marginTop: 20,
          marginBottom: 15,
        }}
        onPress={() => {
          navigation.navigate("Login", { email: "", password: "" });
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
