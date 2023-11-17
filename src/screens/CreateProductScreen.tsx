import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

import AppButton from "../components/atoms/AppButton";
import AppInput from "../components/atoms/AppInput";
import AppImagePicker from "../components/molecules/AppImagePicker";
import AppHeader from "../components/organisms/AppHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import { createProduct, deleteProduct, updateProduct } from "../lib/api/api";
import { ProfileOrderParamList } from "../navigation/ProfileOrdersStack";
import { CreateProduct } from "../types";

interface CreateProductScreenProps {
  route: RouteProp<ProfileOrderParamList, "Manage">;
  navigation: NavigationProp<ProfileOrderParamList>;
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
    onSuccess(data, variables, context) {
      showMessage({
        message: "Produit mis à jour",
        type: "success",
      });
      navigation.goBack();
    },
    onError() {
      showMessage({
        message: "Une erreur est survenue",
        type: "danger",
      });
    },
  });

  const delMutation = useMutation({
    mutationFn: () => deleteProduct(product!.id),
    onSuccess() {
      showMessage({
        message: "Produit supprimé",
        type: "success",
      });
      navigation.goBack();
    },
    onError() {
      showMessage({
        message: "Une erreur est survenue",
        type: "danger",
      });
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

  return (
    <SafeAreaView>
      <AppHeader title="Gestion du produit" navigation={navigation}>
        {product && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
            }}
            onPress={() => delMutation.mutate()}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        )}
      </AppHeader>
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
          rules={{
            required: "Une image est requise",
          }}
          render={(value) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <AppImagePicker
                imageProps={{
                  source: { uri: value.field.value.uri },
                  containerStyle: {
                    width: 120,
                    height: 120,
                    borderRadius: 10,
                  },
                }}
                onImageSelected={(image) => setValue("image", image)}
              />
            </View>
          )}
          name="image"
        />
        <Controller
          control={control}
          rules={{
            required: "Nom du produit requis",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
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
            required: "Prix du produit requis",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
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
            required: "Description du produit requise",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              placeholder="Description du produit"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="description"
        />

        <AppButton
          title={"Sauvegarder"}
          onPress={handleSubmit((data) => mutation.mutate(data))}
        />
      </View>
    </SafeAreaView>
  );
}
