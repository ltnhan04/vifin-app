import { ImageSourcePropType } from 'react-native';
export type ButtonProps = {
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleOnPress: () => void;
  background: string;
  textColor: string;
  icon?: ImageSourcePropType;
};
