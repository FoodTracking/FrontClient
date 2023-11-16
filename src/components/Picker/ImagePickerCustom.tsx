import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { CreateProduct } from "../../types";

// Définir les types pour les props
interface ImagePickerCustomProps {
  table: {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
  };
  user: string;
  onImageSelected: (image: any) => void; // Ajouter ceci
}
export default function ImagePickerCustom({
  table,
  user,
}: ImagePickerCustomProps) {
  const { control, setValue } = useForm<CreateProduct>({
    defaultValues: {
      restaurantId: user,
      name: table.name,
      description: table.description,
      price: table.price?.toString(),
      image: { uri: table.image },
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
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable onPress={pickImage}>
            <Text>Choisir une image</Text>
          </Pressable>
        )}
        name="image"
        rules={{ required: true }}
      />
    </View>
  );
}
