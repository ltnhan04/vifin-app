import { Control, FieldError } from "react-hook-form";
import type { signInType, signUpType } from "@/schema/auth.schema";
import type { ProfileType } from "@/schema/profile.schema";

export type FormData = {
  name: string;
  password: string;
  confirmPassword?: string;
};

export type FormDataProps = {
  label: string;
  type: KeyBoardType;
  isSecure?: boolean;
  isDisabled: boolean;
  icon?: string;
  error: FieldError<signInType | signUpType | ProfileType> | undefined;
  placeholder: string;
  name: ValidFieldName;
  testId?: string;

  handleShowingPassword?: () => void;
  control: Control<signInType | signUpType | ProfileType>;
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

export type ValidFieldName =
  | "email"
  | "password"
  | "confirmPassword"
  | "name"
  | "full_name";
