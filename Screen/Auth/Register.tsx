import React, { useState } from "react";
import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import BaseButton from "../../src/components/Button/BaseButton";
import { useNavigation } from "@react-navigation/native";
import BaseInput from "../../src/components/Input/BaseInput";
import { Palette } from "../../styles/colors";
import { RootStackParamList } from "../../src/components/navigation/AuthStack";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import Switch from "../../src/components/Button/Switch";

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
  const [isSelected, setIsSelected] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://api.follow-food.alexandre-pezat.fr/auth/register",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }
      );

      updateAccess(true);
      // Update the access after successful registration
      console.log("LOG FROM REGISTER ", JSON.stringify(response.data)); // Log the response data for debugging
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

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
          fontSize: 30,
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
        }}
        selected={isSelected}
        containerStyle={{
          alignSelf: "center",
          marginTop: 10,
        }}
      />
      {/* {isSelected ? ( */}
      <View style={{ marginHorizontal: 50 }}>
        <BaseInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal: 30,
          }}
          placeholder="Prénom"
          value={firstName}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setFirstName(event.nativeEvent.text)
          }
        />
        <BaseInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal: 30,
          }}
          placeholder="Nom"
          value={lastName}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setLastName(event.nativeEvent.text)
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
            placeholder="Nom"
            value={namePro}
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setFirstName(event.nativeEvent.text)
            }
          />
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 30,
              marginHorizontal: 30,
            }}
            placeholder="Description"
            value={description}
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setLastName(event.nativeEvent.text)
            }
          />
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

          {/* <BaseInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal: 30,
          }}
          placeholder="Code postal"
          value=""
          onChange={() => {}}
        /> */}
        </View>
        <View style={{ marginHorizontal: 50 }}>
          <BaseInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              marginTop: 30,
              marginHorizontal: 30,
            }}
            placeholder="Mot de passe"
            value={password}
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setPassword(event.nativeEvent.text)
            }
          />
        </View>
        {/* <View style={{ marginHorizontal: 50 }}>
        <BaseInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal: 30,
          }}
          placeholder="Confirmer mot de passe"
          value=""
          onChange={() => {}}
        />
      </View> */}
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
            marginBottom: 30,
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
    </View>
  );
}
