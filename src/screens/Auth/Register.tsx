import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Image, Pressable, SafeAreaView, View } from "react-native";

import AppButton from "../../components/atoms/AppButton";
import DropdownComponent from "../../components/atoms/AppDropDown";
import AppInput from "../../components/atoms/AppInput";
import AppSwitch from "../../components/atoms/AppSwitch";
import { useAuthContext } from "../../hooks/useAuthContext";
import { axiosInstance } from "../../lib/api/api";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { CreateIdentityDto } from "../../types";

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
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [isSelected, setIsSelected] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({});

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!isSelected) {
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
          dataIdResto,
        );

        setIsAuthenticated(true);
        // Update the access after successful registration
        console.log("LOG FROM REGISTER ", JSON.stringify(response.data)); // Log the response data for debugging
      } catch (error) {
        console.error("An error occurred during USER registration:", error);
        console.log(
          "An error occurred during USER registration:",
          (error as AxiosError)?.response?.data,
        );
        const data = JSON.parse((error as AxiosError)?.config?.data);
        console.error("request data", data);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../../assets/logo.png")}
        style={{
          alignSelf: "center",
          marginTop: 30,
          width: 180,
          height: 180,
        }}
      />
      <Text
        h3
        style={{
          alignSelf: "center",
        }}
      >
        Inscription | {isSelected ? "Restaurateur" : "Particulier"}
      </Text>

      <AppSwitch
        setSelected={() => {
          setIsSelected(!isSelected);
        }}
        selected={isSelected}
        containerStyle={{
          alignSelf: "center",
          marginTop: 10,
        }}
      />

      <View style={{ marginHorizontal: 50, marginVertical: 35, gap: 20 }}>
        {!isSelected ? (
          <>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  placeholder="Prénom"
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
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
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
                <AppInput
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
                <AppInput
                  placeholder="Password"
                  onChange={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              )}
              name="password"
            />
            {errors.password && <Text>{errors.password.message}</Text>}
          </>
        ) : (
          <>
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
                <AppInput
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
                <AppInput
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
                <AppInput
                  placeholder="Name"
                  onChange={onChange}
                  value={value}
                />
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
                <AppInput
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
                <AppInput
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
          </>
        )}

        <AppButton
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
    </SafeAreaView>
  );
}
