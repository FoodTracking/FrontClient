import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, SafeAreaView, View, Text } from "react-native";
import { showMessage } from "react-native-flash-message";

import BaseInput from "../components/Input/BaseInput";
import { useAuthContext } from "../hooks/useAuthContext";
import { updateUser } from "../lib/api/api";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { UpdateUserDto } from "../types";
import Navigation from "../navigation/RootStackNavigator";
import { MainStackParamList } from "../navigation/MainStack";

interface UserProfileEditProps {
  navigation: NavigationProp<MainStackParamList>;
}

export default function EditUserScreen({
  navigation,
}: UserProfileEditProps): React.JSX.Element {
  const { user } = useAuthContext();
  const { handleSubmit, control } = useForm<UpdateUserDto>({
    defaultValues: {
      id: user?.id,
      firstName: user?.name.split(" ")[0],
      lastName: user?.name.split(" ")[1],
    },
  });

  const mutate = useMutation({
    mutationFn: async (data: UpdateUserDto) => updateUser(data),
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

  const onSubmit = async (data: any) => {
    await mutate.mutateAsync(data);
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
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                placeholder={"Prénom"}
                onChange={onChange}
                onBlur={onBlur}
                value={value ?? ""}
              />
            )}
            name="firstName"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                placeholder={"Nom de famille"}
                onChange={onChange}
                onBlur={onBlur}
                value={value ?? ""}
              />
            )}
            name="lastName"
          />
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
