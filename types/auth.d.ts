import type { CustomerType } from "@/types/customer";

export type AuthType = {
  token: string;
  user: CustomerType | null;
};
