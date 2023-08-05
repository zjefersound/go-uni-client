import { IValidationError } from "@/models/IValidationReturn";

interface Props {
  id: string;
  errors: IValidationError[];
}
export function FieldError({ id, errors }: Props) {
  const currentError = errors.find(error => error.field === id);
  if(!currentError) return null;

  return (
    <span className="text-sm text-red-600">{currentError.message}</span>
  )
}
