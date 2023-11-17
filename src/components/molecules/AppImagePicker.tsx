import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Pressable, View } from "react-native";

import { PickedImage } from "../../types";
import AppImage, { AppImageProps } from "../atoms/AppImage";

interface ImagePickerCustomProps {
  imageProps: AppImageProps;
  onImageSelected: (image: PickedImage) => void;
}

export default function AppImagePicker({
  imageProps,
  onImageSelected,
}: ImagePickerCustomProps) {
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
      onImageSelected({
        uri: localUri,
        name: filename!,
        type,
      });
    }
  };

  return (
    <View>
      <Pressable
        style={{
          width: "100%",
        }}
        onPress={pickImage}
      >
        <AppImage {...imageProps} />
      </Pressable>
    </View>
  );
}
