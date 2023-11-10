/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

import {
  CreateProduct,
  Identity,
  Order,
  OrderItem,
  RestaurantPreview,
} from "../../types";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url === "/auth/refresh") return config;

    const token = await AsyncStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (error.response.status === 401 && config.url !== "/auth/refresh") {
      const token = await refreshTokenFn();
      if (!token) return Promise.reject(error);

      config.headers.Authorization = `Bearer ${token}`;
      return axiosInstance(config);
    }
    return Promise.reject(error);
  }
);

const refreshTokenFn = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const { data } = await axiosInstance.get<{
      accessToken: string;
      refreshToken: string;
    }>("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    await AsyncStorage.setItem("accessToken", data.accessToken);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);
    return data.accessToken;
  } catch {
    return null;
  }
};

export const fetchCategories = async (): Promise<
  {
    id: string;
    name: string;
  }[]
> => {
  const { data } =
    await axiosInstance.get<{ id: string; name: string }[]>("/categories");
  return data;
};

export const fetchRestaurants = async (
  page: number,
  name?: string,
  category?: string
): Promise<RestaurantPreview[]> => {
  const { data } = await axiosInstance.get<RestaurantPreview[]>(
    "/restaurants",
    { params: { page, take: 5, name, category } }
  );
  return data;
};

export const getMyIdentity = async (): Promise<Identity> => {
  const { data } = await axiosInstance.get<Identity>(`/identity/me`);
  return data;
};

export const fetchOrders = async ({ restaurantId }: any): Promise<Order[]> => {
  const { data } = await axiosInstance.get<Order[]>(
    `restaurants/${restaurantId}/orders/`
  );
  return data;
};

export const updateStatus = async (id: string) => {
  const { data } = await axiosInstance.patch(`/orders/${id}/next`, {});
  return data;
};

export const createProduct = async (data: CreateProduct) => {
  const form = new FormData();
  form.append("name", data.name);
  form.append("price", data.price);
  form.append("description", data.description);
  form.append("image", data.image);
  const { data: product } = await axiosInstance.post(`/products`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return product;
};
