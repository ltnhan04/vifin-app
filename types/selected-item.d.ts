export interface SelectedItemProps {
  selectedItem: SelectedItemType;
  onChange?: (value: number) => void;
  onChangText?: (value: string) => void;
  value?: number;
  isLoading?: boolean;
}
