import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

import { RestaurantPreview } from "../../types";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export const axiosApiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const fetchCategories = async (): Promise<
  {
    id: string;
    name: string;
  }[]
> => {
  const { data } =
    await axiosApiClient.get<{ id: string; name: string }[]>("/categories");
  return data;
};

export const fetchRestaurants = async (
  page: number,
  name?: string,
): Promise<RestaurantPreview[]> => {
  const { data } = await axiosApiClient.get<RestaurantPreview[]>(
    "/restaurants",
    { params: { page, take: 5, name } },
  );
  return data;
};
