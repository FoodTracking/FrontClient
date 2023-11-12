export enum OrderStatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
  DELIVERED = "DELIVERED",
}

export interface UserSession {
  id: string;
  email: string;
  role: "user" | "restaurant" | "admin";
  avatar: string;
  name: string;
}

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

export interface Restaurant extends RestaurantPreview {
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface OrderItem {
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
  status: OrderStatusEnum;
  createdAt: string;
}

export interface RestaurantOrder {
  id: string;
  price: number;
  status: OrderStatusEnum;
  products: OrderItem[];
  user: string;
}
