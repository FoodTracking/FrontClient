export interface UserSession {
  id: string;
  email: string;
  role: "user" | "restaurant" | "admin";
  avatar: string;
  name: string;
}

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
  image: UserSession["avatar"];
}

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
}

export interface CreateOrderDto {
  restaurantId: string;
  products: Omit<OrderItem, "name">[];
}


export interface Order {
  id: string;
  restaurant: RestaurantPreview;
  products: OrderItem[];
  status: string;
  createdAt: string;
}

export interface UserOrder {
  id: string;
  restaurant: Omit<RestaurantPreview, "category">;
  quantity: number;
  price: number;
  createdAt: string;
}

export interface ProductOrder {
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
