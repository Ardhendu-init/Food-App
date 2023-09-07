import { ReactNode } from "react";

export type MenuType = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export type ProductType = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  rating?: number;
  options?: { title: string; additionalPrice: number }[];
};
export interface ChildrenProps {
  children: ReactNode;
}

export type OrderType = {
  id: string;
  userEmail: string;
  price: number;
  products: CartItemType[];
  status: string;
  createdAt: Date;
  intent_id?: String;
};

export type CartItemType = {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
};

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

export type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  resetCart: () => void;
};

export type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

export type Option = {
  title: string;
  additionalPrice: number;
};
