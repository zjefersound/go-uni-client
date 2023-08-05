export interface IValidationError {
  field: string; message: string
}
export interface IValidationReturn {
  isValid: boolean;
  errors: IValidationError[];
}
