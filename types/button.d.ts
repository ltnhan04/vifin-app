export type ButtonProps = {
  title: string;
  isLoading: boolean;
  handleOnPress: () => void;
  background: string;
  textColor: string;
  icon?: HTMLImageElement;
};
