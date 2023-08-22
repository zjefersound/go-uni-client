import {
  IValidationError,
  IValidationReturn,
} from "@/models/IValidationReturn";
import { ILoginPayload } from "..";

export function isValidLogin(ride: ILoginPayload): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!ride.username.trim()) {
    errors.push({ field: "username", message: "Digite o username" });
  }
  if (!ride.password) {
    errors.push({ field: "password", message: "Digite a sua senha" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}
