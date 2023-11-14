import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, View } from "react-native";

import BaseButton from "../components/Button/BaseButton";
import BaseInput from "../components/Input/BaseInput";
import { useAuthContext } from "../hooks/useAuthContext";
import { createProduct, updateProduct } from "../lib/api/api";
import { MainStackParamList } from "../navigation/MainStack";
import { ProfileOrderParamList } from "../navigation/ProfileOrdersStack";
import { CreateProduct } from "../types";

interface CreateProductScreenProps {
  route: RouteProp<ProfileOrderParamList, "Manage">;
  navigation: NavigationProp<MainStackParamList>;
}

export default function CreateProductScreen({
  route,
  navigation,
}: CreateProductScreenProps) {
  const { product } = route.params ?? {};
  const { user } = useAuthContext();

  const mutation = useMutation({
    mutationFn: (data: CreateProduct) => {
      if (data.image.uri === product?.image) {
        // @ts-ignore
        delete data.image;
      }
      return !product ? createProduct(data) : updateProduct(product.id, data);
    },
  });

  const { handleSubmit, control, setValue } = useForm<CreateProduct>({
    defaultValues: {
      restaurantId: user!.id,
      name: product?.name,
      description: product?.description,
      price: product?.price?.toString(),
      image: { uri: product?.image },
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const localUri = file.uri;
      const filename = localUri.split("/").pop();

      // Infer the type of the image
      const match = /\.(\w+)$/.exec(filename!);
      const type = match ? `image/${match[1]}` : `image`;
      setValue("image", {
        uri: localUri,
        name: filename!,
        type,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 30,
          marginBottom: 50,
        }}
      >
        Créer un produit
      </Text>
      <View style={{ marginHorizontal: 50 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BaseInput
              style={{
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                marginTop: 30,
                marginHorizontal: 30,
              }}
              placeholder="Nom du produit"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BaseInput
              style={{
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                marginTop: 30,
                marginHorizontal: 30,
              }}
              placeholder="Prix du produit"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="price"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BaseInput
              style={{
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                marginTop: 30,
                marginHorizontal: 30,
              }}
              placeholder="Description du produit"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="description"
        />
        <Controller
          control={control}
          render={(value) => (
            <>
              <BaseButton
                style={{ alignSelf: "center", marginTop: 20 }}
                title="Choisir une image"
                onPress={pickImage}
              />
              {value.field.value?.uri && (
                <Image
                  source={{ uri: value.field.value.uri }}
                  style={{ width: 200, height: 200, marginBottom: 10 }}
                />
              )}
            </>
          )}
          name="image"
        />
        <BaseButton
          style={{ alignSelf: "center", marginTop: 20 }}
          title="Créer un produit"
          onPress={handleSubmit((data) => mutation.mutate(data))}
        />
      </View>
    </View>
  );
}
