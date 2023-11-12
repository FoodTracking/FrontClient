import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BaseInput from "../components/Input/BaseInput";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthStackParamList } from "../navigation/AuthStack";

interface UserProfileEditProps {
  navigation: StackNavigationProp<AuthStackParamList, "Onboarding">;
}

export function isValidEmail(email: string): boolean {
  const emailPattern: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailPattern.test(email);
}

export default function UserProfileEdit({
  navigation,
}: UserProfileEditProps): React.JSX.Element {
  const { setIsAuthenticated } = useAuthContext();

  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleFirstnameChange = (text: string) => {
    setFirstname(text);
  };

  const handleLastnameChange = (text: string) => {
    setLastname(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      Alert.alert("Invalid email format. Please enter a valid email address.");
    }
    // Send updated data to the backend
    // Handle profile update logic here
  };

  const handleLogout = async () => {
    // Supprimer le jeton d'authentification du stockage
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");

    // Rediriger vers l'écran de connexion
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, paddingBottom: 20 }}>Edit Profile</Text>
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{ position: "absolute", right: 0 }}
        >
          <FontAwesome name="power-off" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>First Name</Text>

            <BaseInput
              placeholder={firstname}
              onChange={handleFirstnameChange}
              value={firstname}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Last Name</Text>

            <BaseInput
              placeholder={lastname}
              onChange={handleLastnameChange}
              value={lastname}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Email</Text>
            <BaseInput
              placeholder={email}
              onChange={handleEmailChange}
              value={email}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Password</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <BaseInput
                secureTextEntry={!showPassword}
                placeholder={password}
                onChange={handlePasswordChange}
                value={password}
                style={{ flex: 1 }}
              />
              <TouchableOpacity>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={24}
                  color="black"
                  onPress={toggleShowPassword}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{ position: "absolute", right: 0 }}
        >
          <FontAwesome name="power-off" size={24} color="black" />
        </TouchableOpacity>
        <Button color="black" title="Save Changes" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
