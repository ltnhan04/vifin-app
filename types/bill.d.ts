export interface IResponseBill {
  data: IBillData;
  message: string;
}

export interface IBillData {
  storeName: string;
  date: string;
  invoiceNumber: string;
  items: Item[];
  total: number;
  type: string;
  category: string;
  category_id?: string;
  wallet_id?: string;
  wallet_name?: string;
}

export interface Item {
  name: string;
  price: number;
}
