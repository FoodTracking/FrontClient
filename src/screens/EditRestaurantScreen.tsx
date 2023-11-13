import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, SafeAreaView, Text } from "react-native";
import { showMessage } from "react-native-flash-message";

import BaseInput from "../components/Input/BaseInput";
import DropdownComponent from "../components/Input/DropDown";
import { useAuthContext } from "../hooks/useAuthContext";
import {fetchRestaurant, updateIdentity, updateRestaurant, updateUser} from "../lib/api/api";
import { UpdateRestaurantDto, UpdateUserDto } from "../types";

export default function EditRestaurantScreen() {
  const { user } = useAuthContext();
  const { data: restaurant } = useQuery({
    queryKey: ["restaurant", user?.id],
    queryFn: () => fetchRestaurant(user!.id),
  });

  const { handleSubmit, control, setValue } = useForm<UpdateRestaurantDto>({
    defaultValues: {
      id: user?.id,
      name: restaurant?.name,
      address: restaurant?.address,
      description: restaurant?.description,
      categoryId: restaurant?.categoryId,
    },
  });

  const mutate = useMutation({
    mutationFn: async (data: UpdateRestaurantDto) => updateRestaurant(data),
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
            placeholder={"Nom"}
            onChange={onChange}
            onBlur={onBlur}
            value={value ?? ""}
          />
        )}
        name="name"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <BaseInput
            placeholder={"Adresse"}
            onChange={onChange}
            onBlur={onBlur}
            value={value ?? ""}
          />
        )}
        name="address"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <BaseInput
            placeholder={"Description"}
            onChange={onChange}
            onBlur={onBlur}
            value={value ?? ""}
          />
        )}
        name="description"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <DropdownComponent onSelect={onChange} value={value} />
        )}
        name="categoryId"
      />

      <Button
        color="black"
        title="Save Changes"
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
}
