import { IValidationError } from "@/models/IValidationReturn";
import { ReactNode } from "react";
import { FieldError } from "./FieldError";

interface Props {
  id: string;
  label: string;
  children: ReactNode;
  errors: IValidationError[]
}
export function FormControl({ id, label, errors, children }: Props) {
  return (
    <div>
      <label htmlFor={id} className="text-gray-700 font-bold">{label}:</label>
      {children}
      <FieldError id={id} errors={errors} />
    </div>
  );
}
