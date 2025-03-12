// src/app/typescript-modules/generics-and-interfaces/interfaces.ts
export interface User {
  readonly id: number;
  name: string;
  email: string;
}

export interface Product {
  readonly id: number;
  name: string;
  price: number;
  category: string;
}

export interface Order {
  orderId: number;
  userId: number;
  products: Product[];
  orderDate: Date;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
