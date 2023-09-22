import { IValidationError } from "@/models/IValidationReturn";
import { ReactNode } from "react";
import { FieldError } from "./FieldError";
import { Label } from "./Label";

interface Props {
  id: string;
  label: string;
  optional?: boolean;
  children: ReactNode;
  errors: IValidationError[];
}
export function FormControl({ id, label, optional, errors, children }: Props) {
  return (
    <div>
      <Label id={id}>{label}: {optional && <span className="text-sm text-gray-400">(opcional)</span>}</Label>
      {children}
      <FieldError id={id} errors={errors} />
    </div>
  );
}
