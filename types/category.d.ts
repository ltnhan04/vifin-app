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
