import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, SafeAreaView, Text } from "react-native";
import { showMessage } from "react-native-flash-message";

import BaseInput from "../components/Input/BaseInput";
import { useAuthContext } from "../hooks/useAuthContext";
import { updateUser } from "../lib/api/api";
import { UpdateUserDto } from "../types";

export default function EditUserScreen() {
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
    <SafeAreaView>
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

      <Button
        color="black"
        title="Save Changes"
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
}
