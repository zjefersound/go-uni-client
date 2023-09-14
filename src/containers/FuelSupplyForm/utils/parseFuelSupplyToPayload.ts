import { IFuelSupply } from "@/models/IFuelSupply";
import { IFuelSupplyPayload } from "@/repositories/FuelSupplyRepository";

export function parseFuelSupplyToPayload(fuelSupply: IFuelSupply) {
  return {
    carId: fuelSupply.car._id,
    date: fuelSupply.date,
    price: fuelSupply.price,
    pricePerLiter: fuelSupply.pricePerLiter,
  } as IFuelSupplyPayload;
}
