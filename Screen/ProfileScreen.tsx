import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import BaseButton from "../src/components/Button/BaseButton";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import BaseInput from "../src/components/Input/BaseInput";
import { MaterialIcons } from "@expo/vector-icons";
import { forSlideRight } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators";
import { StackNavigationProp } from "@react-navigation/stack";

export type YourStackParamList = {
  UserProfileEdit: undefined;
};

interface Options {
  title: string;
}

type UserProfileEditNavigationProp = StackNavigationProp<
  YourStackParamList,
  "UserProfileEdit"
>;

interface UserProfileEditProps {
  navigation: UserProfileEditNavigationProp;
}

interface State {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export function isValidEmail(email: string): boolean {
  const emailPattern: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailPattern.test(email);
}

export default function UserProfileEdit({
  navigation,
}: UserProfileEditProps): React.JSX.Element {
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
      return;
    }
    // Send updated data to the backend
    // Handle profile update logic here
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
            marginTop: 10,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, paddingBottom: 20, marginTop: 10 }}>
          Edit Profile
        </Text>
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
        <Button color="black" title="Save Changes" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
