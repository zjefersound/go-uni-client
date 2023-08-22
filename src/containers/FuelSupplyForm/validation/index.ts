import {
  IValidationError,
  IValidationReturn,
} from "@/models/IValidationReturn";
import { IFuelSupplyPayload } from "@/services/fuelSupply";

export function isValidNewFuelSupply(
  data: IFuelSupplyPayload
): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!data.carId) {
    errors.push({ field: "carId", message: "Selecione um carro" });
  }
  if (!data.date) {
    errors.push({ field: "date", message: "Insira uma data" });
  }

  if (data.price < 0 || !data.price) {
    errors.push({
      field: "price",
      message: "O valor não pode ser negativo",
    });
  }
  if (data.pricePerLiter < 0 || !data.pricePerLiter) {
    errors.push({
      field: "pricePerLiter",
      message: "O valor não pode ser negativo",
    });
  }
  return {
    isValid: !errors.length,
    errors,
  };
}
