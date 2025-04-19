import { ImageSourcePropType } from "react-native";

export type CategoryChildrenType = {
  label: string;
  value: string;
  icon: ImageSourcePropType;
};

export type CategoryType = {
  label: string;
  value: string;
  parentIcon: ImageSourcePropType;
  children?: CategoryChildrenType[];
};

export interface IResponseChildrenCategory {
  data: ICategoryChildren;
  message: string;
}
export interface IResponseCategory {
  data: ICategory[];
  message: string;
}

export interface ICategory {
  symbol: string;
  parent_id?: string;
  createdBy: string;
  transaction_type: string;
  createdAt: CreatedAt;
  name: string;
  updatedAt: UpdatedAt;
  _id: string;
  children: ICategoryChildren[];
}

export interface CreatedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface ICategoryChildren {
  symbol: string;
  parent_id: string | null;
  createdBy?: "system" | string;
  transaction_type: string;
  createdAt?: CreatedAt2;
  name: string;
  updatedAt?: UpdatedAt2;
  _id: string;
}

export interface CreatedAt2 {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt2 {
  _seconds: number;
  _nanoseconds: number;
}
