import {
  IValidationError,
  IValidationReturn,
} from "@/models/IValidationReturn";
import { IRidePayload } from "@/repositories/RideRepository";

export function isValidNewRide(ride: IRidePayload): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!ride.tripId) {
    errors.push({ field: "tripId", message: "Selecione um trajeto" });
  }
  if (!ride.carId) {
    errors.push({ field: "carId", message: "Selecione um carro" });
  }
  if (!ride.date) {
    errors.push({ field: "date", message: "Insira uma data" });
  }
  if (ride.passengers <= 0 || !ride.passengers) {
    errors.push({
      field: "passengers",
      message: "O valor deve ser maior que zero",
    });
  }
  if (ride.passengersOneWay < 0) {
    errors.push({
      field: "passengersOneWay",
      message: "O valor não pode ser negativo",
    });
  }

  if (ride.pricePerPassenger < 0 || !ride.pricePerPassenger) {
    errors.push({
      field: "pricePerPassenger",
      message: "O valor não pode ser negativo",
    });
  }

  if (ride.extraCosts < 0) {
    errors.push({
      field: "extraCosts",
      message: "O valor não pode ser negativo",
    });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}
