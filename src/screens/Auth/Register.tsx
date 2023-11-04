import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { Palette } from "../../../styles/colors";
import BaseButton from "../../components/Button/BaseButton";
import Switch from "../../components/Button/Switch";
import BaseInput from "../../components/Input/BaseInput";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthStackParamList } from "../../navigation/AuthStack";

type OnboardingScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Register"
>;

export default function RegisterScreen() {
  const { setIsAuthenticated } = useAuthContext();
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const onPressLogin = async () => {
    navigation.navigate("Login", { email, password });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [namePro, setNamePro] = useState("");
  const [description, setDescription] = useState("");
  const [addresse, setAddresse] = useState("");
  const [categorie, setCategorie] = useState("");
  const [role, setRole] = useState("user");
  const [isSelected, setIsSelected] = useState(false);

  const handleRegister = async () => {
    try {
      if (!isSelected) {
        try {
          const response = await axios.post(
            "https://api.follow-food.alexandre-pezat.fr/auth/register",
            {
              user: {
                firstName: firstName as string,
                lastName: lastName as string,
              } as object,
              email: email as string,
              password: password as string,
              role: role as string,
            },
          );
          console.log("LOG FROM REGISTER ", JSON.stringify(response)); // Log the response data for debuggin
          setIsAuthenticated(true);
          // Update the access after successful registration
          console.log("LOG FROM REGISTER ", JSON.stringify(response.data)); // Log the response data for debugging
        } catch (error) {
          console.log(
            "An error occurred during USER registration:",
            (error as AxiosError)?.response?.data,
          );
        }
      } else {
        try {
          const response = await axios.post(
            "https://api.follow-food.alexandre-pezat.fr/auth/register",
            {
              restaurant: {
                name: namePro as string,
                description: description as string,
                address: addresse as string,
                category: categorie as string,
                email: email as string,
                password: password as string,
                role: role as string,
              } as object,
            },
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
        }
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      console.log(
        "An error occurred during USER registration:",
        (error as AxiosError)?.response?.data,
      );
    }
  };

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
            onChange={(text) => setEmail(text)}
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
            onChange={(text) => setPassword(text)}
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
            onChange={(text) => setFirstName(text)}
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
            onChange={(text) => setLastName(text)}
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
            onChange={(text) => setEmail(text)}
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
            onChange={(text) => setPassword(text)}
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
            value={namePro}
            onChange={(text) => setFirstName(text)}
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
            onChange={(text) => setLastName(text)}
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
            onChange={(text) => setLastName(text)}
          />
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 15,
            }}
            placeholder="Categorie"
            value={categorie}
            onChange={(text) => setLastName(text)}
          />
        </View>
      )}

      <BaseButton
        style={{ alignSelf: "center", marginTop: 20 }}
        title="S'inscrire"
        onPress={() => {
          alert("Inscription");
          handleRegister();

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
          // onPressLogin();
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
