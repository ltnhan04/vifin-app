import { Control, FieldError } from "react-hook-form";
import type { signInType, signUpType } from "@/schema/auth.schema";

export type FormData = {
  name: string;
  password: string;
  confirmPassword?: string;
};

export type FormDataProps = {
  label: string;
  type: KeyBoardType;
  isSecure?: boolean;
  icon?: string;
  error: FieldError<signInType | signUpType> | undefined;
  placeholder: string;
  name: ValidFieldName;

  handleShowingPassword?: () => void;
  control: Control<signInType | signUpType>;
};

export type KeyBoardType =
  | "default"
  | "numeric"
  | "email-address"
  | "ascii-capable"
  | "numbers-and-punctuation"
  | "url"
  | "number-pad"
  | "phone-pad"
  | "name-phone-pad"
  | "decimal-pad"
  | "twitter"
  | "web-search"
  | "visible-password";

export type ValidFieldName = "email" | "password" | "confirmPassword";
