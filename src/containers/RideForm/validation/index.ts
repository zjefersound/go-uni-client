import {
  IValidationError,
  IValidationReturn,
} from "@/models/IValidationReturn";
import { ICreateRidePayload, IRideBill } from "@/services/ride";

export function isValidNewRide(ride: ICreateRidePayload): IValidationReturn {
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
  if (ride.bills.length > 0) {
    ride.bills.forEach(bill => {
      const { isValid } =isValidRideBill(bill);
      if(!isValid) {
        errors.push({
          field: "bills",
          message: "Passageiros inválidos",
        });
      }
    })
  }

  return {
    isValid: !errors.length,
    errors,
  };
}

export function isValidRideBill (passenger: IRideBill) {
  const errors: IValidationError[] = [];
  if (Number.isNaN(passenger.amount)) {
    errors.push({
      field: "amount",
      message: "Preço por passageiro não definido",
    });
  }
  if (passenger.amount <= 0) {
    errors.push({
      field: "amount",
      message: "O valor deve ser positivo",
    });
  }
  if (!passenger.description.trim() && !passenger.payerId) {
    errors.push({
      field: "payerId",
      message: "Selecione o passageiro ou escreva na descrição",
    });
  }
  return {
    isValid: !errors.length,
    errors,
  };
}