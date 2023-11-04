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
  name: string;
  description: string;
  address: string;
  categoryId: string;
  image: Identity["image"];
}

export interface Identity {
  email: string;
  role: "user" | "restaurant";
  image: string;
}
