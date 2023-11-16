import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

import BaseInput from "../components/Input/BaseInput";
import { useAuthContext } from "../hooks/useAuthContext";
import { fetchIdentity, updateIdentity } from "../lib/api/api";
import { MainStackParamList } from "../navigation/MainStack";
import { UpdateIdentityDto } from "../types";

interface UserProfileEditProps {
  navigation: NavigationProp<MainStackParamList>;
}

export default function UserProfileEdit({
  navigation,
}: UserProfileEditProps): React.JSX.Element {
  const { user, setUser } = useAuthContext();
  const { handleSubmit, control } = useForm<UpdateIdentityDto>({
    defaultValues: {
      id: user?.id,
      email: user?.email,
    },
  });

  const mutate = useMutation({
    mutationFn: async (data: UpdateIdentityDto) => updateIdentity(data),
    onSuccess: () => {
      showMessage({
        message: "Informations mises à jour",
        type: "success",
      });
    },
    onError: () => {
      showMessage({
        message: "Une erreur est survenue",
        type: "danger",
      });
    },
  });

  const onSubmit = async (data: UpdateIdentityDto) => {
    await mutate.mutateAsync(data);
    const identity = await fetchIdentity();
    setUser(identity);
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

        <Text style={{ fontSize: 18, paddingBottom: 20 }}>
          Edition du profil
        </Text>
      </View>

      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Controller
            control={control}
            rules={{
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "L'email doit être valide",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                placeholder={"Email"}
                onChange={onChange}
                onBlur={onBlur}
                value={value ?? ""}
              />
            )}
            name="email"
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Controller
              control={control}
              rules={{
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/,
                  message:
                    "Le mot de passe doit contenir au moins : \n 1 Majuscule \n 1 Minuscule \n 1 Chiffre \n 1 Caractère spécial \n 12 Caractères minimum",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <BaseInput
                  placeholder={"Mot de passe"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ?? ""}
                />
              )}
              name="password"
            />
          </View>
        </View>

        <Button
          color="black"
          title="Save Changes"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
