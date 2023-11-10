import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

import { eventManager } from "../../EventEmitter";
import {
  CreateOrderDto,
  Order,
  RestaurantOrder,
  RestaurantPreview,
  UserOrder,
  UserSession,
  CreateProduct,
  OrderItem,
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
      if (!token) {
        eventManager.emit("unauthorized");
        return Promise.resolve();
      }

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

export const fetchUserOrders = async (uid: string, page: number) => {
  const { data } = await axiosInstance.get<UserOrder[]>(
    `/users/${uid}/orders`,
    {
      params: { page, take: 5 },
    }
  );
  return data;
};

export const fetchOrder = async (id: string) => {
  const { data } = await axiosInstance.get<Order>(`/orders/${id}`);
  return data;
};

export const insertOrder = async (order: CreateOrderDto) => {
  const { data } = await axiosInstance.post<CreateOrderDto>(`/orders`, order);
  return data;
};

export const fetchIdentity = async () => {
  const { data } = await axiosInstance.get<UserSession>(`/identity/me`);
  return data;
};

export const fetchOrders = async (
  restaurantId: string
): Promise<RestaurantOrder[]> => {
  alert(restaurantId);
  const { data } = await axiosInstance.get<RestaurantOrder[]>(
    `restaurants/${restaurantId}/orders/`
  );
  return data;
};

export const updateStatus = async (id: string) => {
  const { data } = await axiosInstance.patch(`/orders/${id}/next`, {});
  return data;
};

const fetchImageFromUri = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const file = new File([blob], "image.jpeg");
  return file;
};

export const createProduct = async (data: CreateProduct) => {
  const file = await fetchImageFromUri(data.image);
  alert(JSON.stringify(file));
  const form = new FormData();
  form.append("name", data.name);
  form.append("price", data.price);
  form.append("description", data.description);
  form.append("image", file);
  form.append("restaurantId", data.restaurantId);
  const { data: product } = await axiosInstance.post(`/products`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return product;
};
