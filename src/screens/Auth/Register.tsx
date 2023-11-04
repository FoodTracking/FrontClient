import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";

import { Palette } from "../../../styles/colors";
import BaseButton from "../../components/Button/BaseButton";
import Switch from "../../components/Button/Switch";
import BaseInput from "../../components/Input/BaseInput";
import DropdownComponent from "../../components/Input/DropDown";
import { useAuthContext } from "../../hooks/useAuthContext";
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
        const response = await axios.post(
          "https://api.follow-food.alexandre-pezat.fr/auth/register",
          {
            user: {
              firstName: data.firstName,
              lastName: data.lastName,
            },
            email: data.email,
            password: data.password,
            role: "user",
          },
        );
        console.log("LOG FROM REGISTER ", JSON.stringify(response));
        setIsAuthenticated(true);
        console.log("LOG FROM REGISTER ", JSON.stringify(response.data));
      } catch (error) {
        console.error("An error occurred during USER registration:", error);
        console.log(
          "An error occurred during USER registration:",
          (error as AxiosError)?.response?.data,
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
        const response = await axios.post<CreateIdentityDto>(
          "https://api.follow-food.alexandre-pezat.fr/auth/register",
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

  const [isSelected, setIsSelected] = useState(false);
  const [role, setRole] = useState("user");

  // function handleMail(text: string) {
  //   setEmail(text);
  // }

  // function handlePassword(text: string) {
  //   setPassword(text);
  // }

  // function handleFirstName(text: string) {
  //   setFirstName(text);
  // }

  // function handleLastName(text: string) {
  //   setLastName(text);
  // }

  // function handleNamePro(text: string) {
  //   setNamePro(text);
  // }

  // function handleDescription(text: string) {
  //   setDescription(text);
  // }

  // function handleAddresse(text: string) {
  //   setAddresse(text);
  // }

  // function handleCategorySelection(value: string) {
  //   console.log("OK", JSON.stringify(value));
  //   setCategory(value);
  // }
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
          {errors.firstName && <Text>This is required.</Text>}
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
          <Controller
            control={control}
            rules={{
              required: true,
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
          {errors.email && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="Password"
                onChange={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}
        </View>
      ) : (
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
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
          {errors.email && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <BaseInput
                placeholder="Password"
                onChange={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}
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
          {errors.namePro && <Text>This is required.</Text>}
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
          {errors.description && <Text>This is required.</Text>}
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
          {errors.addresse && <Text>This is required.</Text>}
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
          {errors.category && <Text>This is required.</Text>}

          {/* <BaseInput
            {...register("email")}
            placeholder="Email"
            value={email}
            onChangeText={(text) => register("email", { value: text })}
          />
          <BaseInput
            {...register("password")}
            value={password}
            placeholder="Password"
            onChangeText={(text) => register("password", { value: text })}
          />
          <BaseInput
            {...register("namePro")}
            value={namePro}
            placeholder="Name"
            onChangeText={(text) => register("namePro", { value: text })}
          />
          <BaseInput
            {...register("description")}
            value={description}
            placeholder="Description"
            onChangeText={(text) => register("description", { value: text })}
          />
          <BaseInput
            {...register("addresse")}
            placeholder="Address"
            value={addresse}
            onChangeText={(text) => register("addresse", { value: text })}
          /> */}
          {/* <DropdownComponent onSelect={handleCategorySelection} /> */}
        </View>
      )}

      {/* {!isSelected ? (
        <View style={{ marginHorizontal: 50 }}>
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginHorizontal: 15,
            }}
            placeholder="Adresse Mail"
            value={email}
            onChange={handleMail}
          />
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 15,
            }}
            placeholder="Mot de passe"
            value={password}
            onChange={handlePassword}
          />
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 15,
            }}
            placeholder="Prénom"
            value={firstName}
            onChange={handleFirstName}
          />
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 15,
            }}
            placeholder="Nom"
            value={lastName}
            onChange={handleLastName}
          />
        </View>
      ) : (
        <View style={{ marginHorizontal: 50 }}>
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginHorizontal: 15,
            }}
            placeholder="Adresse Mail"
            value={email}
            onChange={handleMail}
          />
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 15,
            }}
            placeholder="Mot de passe"
            value={password}
            onChange={handlePassword}
          />
          <DropdownComponent onSelect={handleCategorySelection} />

          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 15,
            }}
            placeholder="Nom"
            value={namePro}
            onChange={handleNamePro}
          />
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 15,
            }}
            placeholder="Description"
            value={description}
            onChange={handleDescription}
          />
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 15,
            }}
            placeholder="Adresse"
            value={addresse}
            onChange={handleAddresse}
          />
          <View></View>
        </View>
      )} */}

      <BaseButton
        style={{ alignSelf: "center", marginTop: 20 }}
        title="S'inscrire"
        onPress={() => {
          alert("Inscription");
          handleSubmit(onSubmit)();

          // updateAccess(true);
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
