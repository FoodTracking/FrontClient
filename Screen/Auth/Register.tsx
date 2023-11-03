import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import BaseButton from "../../src/components/Button/BaseButton";
import { useNavigation } from "@react-navigation/native";
import BaseInput from "../../src/components/Input/BaseInput";
import { Palette } from "../../styles/colors";
import { RootStackParamList } from "../../src/components/navigation/AuthStack";
import { StackNavigationProp } from "@react-navigation/stack";
import axios, { AxiosError } from "axios";
import Switch from "../../src/components/Button/Switch";
import DropdownComponent from "../../src/components/List/DropdownList";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

export default function RegisterScreen({
  updateAccess,
}: {
  updateAccess: (access: boolean) => void;
}) {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const onPressLogin = async () => {
    navigation.navigate("Login", { email: email, password: password });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [namePro, setNamePro] = useState("");
  const [description, setDescription] = useState("");
  const [addresse, setAddresse] = useState("");
  const [category, setCategory] = useState("");
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
              role: "user" as string,
            }
          );
          console.log("LOG FROM REGISTER ", JSON.stringify(response)); // Log the response data for debuggin
          updateAccess(true);
          // Update the access after successful registration
          console.log("LOG FROM REGISTER ", JSON.stringify(response.data)); // Log the response data for debugging
        } catch (error) {
          console.log(
            "An error occurred during USER registration:",
            (error as AxiosError)?.response?.data
          );
          const data = JSON.parse((error as AxiosError)?.config?.data);
          console.error("request data", data);
        }
      } else {
        try {
          const response = await axios.post(
            "https://api.follow-food.alexandre-pezat.fr/auth/register",
            {
              email: email as string,
              password: password as string,
              role: "restaurant" as string,
              restaurant: {
                name: namePro as string,
                description: description as string,
                address: addresse as string,
                categoryId: category as string,
              } as object,
            }
          );
          updateAccess(true);
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
    } catch (error) {
      console.error("An error occurred during registration:", error);
      console.log(
        "An error occurred during USER registration:",
        (error as AxiosError)?.response?.data
      );
      const data = JSON.parse((error as AxiosError)?.config?.data);
      console.error("request data", data);
    }
  };

  function handleMail(text: string) {
    setEmail(text);
  }

  function handlePassword(text: string) {
    setPassword(text);
  }

  function handleFirstName(text: string) {
    setFirstName(text);
  }

  function handleLastName(text: string) {
    setLastName(text);
  }

  function handleNamePro(text: string) {
    setNamePro(text);
  }

  function handleDescription(text: string) {
    setDescription(text);
  }

  function handleAddresse(text: string) {
    setAddresse(text);
  }

  function handleCategorySelection(value: string) {
    console.log("OK", JSON.stringify(value));
    setCategory(value);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Palette.white }}>
      <Image
        source={require("../../assets/logo.png")}
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
          onPressLogin();
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
