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
  id: number;
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
