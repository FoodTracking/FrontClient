import { NavigationProp } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, SafeAreaView, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import DropdownComponent from "../components/atoms/AppDropDown";
import AppInput from "../components/atoms/AppInput";
import AppHeader from "../components/organisms/AppHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import { fetchRestaurant, updateRestaurant } from "../lib/api/api";
import { MainStackParamList } from "../navigation/MainStack";
import { UpdateRestaurantDto } from "../types";
import AppButton from "../components/atoms/AppButton";

interface EditRestaurantScreenProps {
  navigation: NavigationProp<MainStackParamList>;
}

export default function EditRestaurantScreen({
  navigation,
}: EditRestaurantScreenProps) {
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

  useEffect(() => {
    setValue("name", restaurant?.name);
    setValue("address", restaurant?.address);
    setValue("description", restaurant?.description);
    setValue("categoryId", restaurant?.categoryId);
  }, [restaurant]);

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
      <AppHeader title="Informations de connexion" navigation={navigation} />

      <View
        style={{
          marginTop: 30,
          margin: 20,
          height: "100%",
          gap: 20,
        }}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
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
            <AppInput
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
            <AppInput
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

        <AppButton
          title="Sauvegarder"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
}
