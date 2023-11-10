import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Button, Image, Text } from "react-native";
import BaseInput from "../components/Input/BaseInput";
import * as ImagePicker from "expo-image-picker";
import BaseButton from "../components/Button/BaseButton";
import { axiosInstance, createProduct } from "../lib/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProduct } from "../types";

export default function CreateNewProduct() {
  const [image, setImage] = React.useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateProduct) => createProduct(data),
  });

  const { handleSubmit, control } = useForm<{
    name: string;
    price: string;
    description: string;
    restaurantId: string;
    image: File | string;
  }>();

  const handleCreateProduct = async (data: CreateProduct) => {
    alert("Produit créé");

    try {
      if (
        typeof data.image === "string" &&
        (data.image as string).startsWith("data:image")
      ) {
        const file = dataURLtoFile(data.image as string, "image.png");
        if (file) {
          data.image = file;
        } else {
          console.error("Error converting base64 to File");
          return;
        }
      }

      const response = await mutation.mutateAsync(data);
      console.log("Product created:", response);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  function dataURLtoFile(dataurl: string, filename: string): File | null {
    const arr = dataurl.split(",");
    const matchResult = arr[0].match(/:(.*?);/);

    if (matchResult?.[1]) {
      const mime = matchResult[1];
      const bstr = atob(arr[arr.length - 1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    } else {
      console.error("Invalid data URL format");
      return null;
    }
  }
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
            alert("Are you sure you want to create this product?");
            handleSubmit(
              (data) => {
                alert("Produit créé");
                handleCreateProduct(data);
              },
              (error) => alert(error)
            )();
          }}
        />
      </View>
    </View>
  );
}
