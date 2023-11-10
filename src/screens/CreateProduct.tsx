import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text } from "react-native";

import BaseButton from "../components/Button/BaseButton";
import BaseInput from "../components/Input/BaseInput";
import { useAuthContext } from "../hooks/useAuthContext";
import { createProduct } from "../lib/api/api";
import { CreateProduct } from "../types";

export default function CreateNewProduct() {
  const [image, setImage] = React.useState<string | null>(null);
  const [image64, setImage64] = React.useState<{ uri: string; name: string; type: string; } | undefined>(undefined);
  const { user } = useAuthContext();



  const mutation = useMutation({
    mutationFn: (data: CreateProduct) =>
      createProduct({
        ...data,
        restaurantId: user!.id,
        image: image64!,
      }),
  });

  const { handleSubmit, control } = useForm<CreateProduct>();

  const handleCreateProduct = async (data: CreateProduct) => {
    alert("Produit créé")
    if (!image) {
      alert("Veuillez choisir une image");
    }
    mutation.mutate(data);
  };




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
      const filename = localUri.split('/').pop();

// Infer the type of the image
      const match = /\.(\w+)$/.exec(filename!);
      const type = match ? `image/${match[1]}` : `image`;


      setImage(result.assets[0].uri);
      setImage64({
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
          render={() => (
            <>
              <BaseButton
                style={{ alignSelf: "center", marginTop: 20 }}
                title="Choisir une image"
                onPress={pickImage}
              />
              {image && (
                <Image
                  source={{ uri: image }}
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
          onPress={() => {
            handleSubmit(
              (data) => handleCreateProduct(data)
            )();
          }}
        />
      </View>
    </View>
  );
}
