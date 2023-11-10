import { OrderStatusEnum } from "./screens/RestaurantTracker";

export interface CreateIdentityDto {
  email: string;
  password: string;
  role: "user" | "restaurant";
  user?: CreateUserDto;
  restaurant?: CreateRestaurantDto;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
}

export interface CreateRestaurantDto {
  name: string;
  description: string;
  address?: string;
  categoryId?: string;
}

export interface RestaurantPreview {
  id: string;
  name: string;
  address: string;
  category: string;
  image: Identity["image"];
}

export interface Identity {
  email: string;
  id: string;
  role: "user" | "restaurant";
  image: string;
}

export interface Order {
  id: string;
  price: number;
  status: OrderStatusEnum;
  products: OrderItem[];
  user: string;
  restaurant: RestaurantPreview;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

export interface CreateProduct {
  name: string;
  price: string;
  description: string;
  image: File | string;
  restaurantId: string;
}
