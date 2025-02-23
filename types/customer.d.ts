export type CustomerType = {
  avatar: string | undefined;
  full_name: string | undefined;
  gender: string;
  email: string | undefined;
  customerId: string;
  provider: string;
};

export interface ResponseCustomerType {
  data: Data;
  message: string;
}

export interface Data {
  avatar: string;
  full_name: string;
  gender: string;
  email: string;
  provider: string;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  _id: string;
}

export interface CreatedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt {
  _seconds: number;
  _nanoseconds: number;
}
