import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as Location from "expo-location";
import qs from "qs";

import { eventManager } from "../../EventEmitter";
import {
  CreateOrderDto,
  CreateProduct,
  Order, OrderStatusEnum,
  Product,
  Restaurant,
  RestaurantOrder,
  RestaurantPreview,
  UpdateIdentityDto,
  UpdateRestaurantDto,
  UpdateUserDto,
  UserOrder,
  UserSession,
} from "../../types";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url === "/auth/refresh") return config;

    const token = await AsyncStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
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
  },
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
  category?: string,
): Promise<RestaurantPreview[]> => {
  const location = await Location.getCurrentPositionAsync();
  const { data } = await axiosInstance.get<RestaurantPreview[]>(
    "/restaurants",
    {
      params: {
        page,
        size: 5,
        name,
        category,
        lat: location.coords.latitude,
        long: location.coords.longitude,
      },
    },
  );
  return data;
};

export const fetchUserOrders = async (uid: string, page: number) => {
  const { data } = await axiosInstance.get<UserOrder[]>(
    `/users/${uid}/orders`,
    {
      params: { page, size: 5 },
    },
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

export const fetchRestaurant = async (id: string) => {
  const { data } = await axiosInstance.get<Restaurant>(`/restaurants/${id}`);
  return data;
};

export const fetchProducts = async (
  id: string,
  page?: number,
  productIds?: string[],
  size: number = 5,
) => {
  const { data } = await axiosInstance.get<Product[]>(
    `/restaurants/${id}/products`,
    {
      params: {
        size,
        page,
        ids: productIds,
      },
    },
  );
  return data;
};

export const fetchRestaurantsOrders = async (
  restaurantId: string,
  status?: OrderStatusEnum[],
  size?: number,
  page?: number,
): Promise<RestaurantOrder[]> => {
  const { data } = await axiosInstance.get<RestaurantOrder[]>(
    `restaurants/${restaurantId}/orders/`,
    {
      params: { page, size, status },
    },
  );
  return data;
};

export const updateStatus = async (id: string) => {
  const { data } = await axiosInstance.patch(`/orders/${id}/next`, {});
  return data;
};

export const updateIdentity = async (identity: UpdateIdentityDto) => {
  const formData = new FormData();
  identity.avatar && formData.append("avatar", identity.avatar);
  identity.password && formData.append("password", identity.password);
  identity.email && formData.append("email", identity.email);
  const { data } = await axiosInstance.patch(
    `/identity/${identity.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

export const updateUser = async (dto: UpdateUserDto) => {
  const { data } = await axiosInstance.patch(`/users/${dto.id}`, dto);
  return data;
};

export const updateRestaurant = async (dto: UpdateRestaurantDto) => {
  const { data } = await axiosInstance.patch(`/restaurants/${dto.id}`, dto);
  return data;
};

export const createProduct = async (data: CreateProduct) => {
  const form = new FormData();
  form.append("name", data.name);
  form.append("price", data.price);
  form.append("description", data.description);
  // @ts-ignore
  // https://github.com/expo/expo/issues/11422
  form.append("image", data.image);
  form.append("restaurantId", data.restaurantId);
try {
  const { data: product } = await axiosInstance.post(`/products`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return product;
} catch (e) {
  console.log(JSON.stringify(e))
}
};

export const updateProduct = async (id: string, data: CreateProduct) => {
  const form = new FormData();
  form.append("name", data.name);
  form.append("price", data.price);
  form.append("description", data.description);
  // @ts-ignore
  // https://github.com/expo/expo/issues/11422
  data.image && form.append("image", data.image);

  const { data: product } = await axiosInstance.patch(`/products/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return product;
};
