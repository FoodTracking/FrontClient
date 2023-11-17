import { NavigationProp } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import AppButton from "../components/atoms/AppButton";
import AppInput from "../components/atoms/AppInput";
import AppHeader from "../components/organisms/AppHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import { updateUser } from "../lib/api/api";
import { MainStackParamList } from "../navigation/MainStack";
import { UpdateUserDto } from "../types";

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
      <AppHeader title="Mon profil" navigation={navigation} />

      <View
        style={{
          marginTop: 30,
          margin: 20,
          height: "100%",
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
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
              <AppInput
                placeholder={"Nom de famille"}
                onChange={onChange}
                onBlur={onBlur}
                value={value ?? ""}
              />
            )}
            name="lastName"
          />
        </View>

        <AppButton title="Sauvegarder" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
}
