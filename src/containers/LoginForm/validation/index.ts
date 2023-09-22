import {
  IValidationError,
  IValidationReturn,
} from "@/models/IValidationReturn";
import { ILoginPayload } from "..";

export function isValidLogin(payload: ILoginPayload): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.username.trim()) {
    errors.push({ field: "username", message: "Digite o username" });
  }
  if (!payload.password) {
    errors.push({ field: "password", message: "Digite a sua senha" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}
