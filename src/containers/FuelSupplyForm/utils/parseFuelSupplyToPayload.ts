import { IFuelSupply, IFuelSupplyPayload } from "@/models/IFuelSupply";
export function parseFuelSupplyToPayload(fuelSupply: IFuelSupply) {
  return {
    carId: fuelSupply.car._id,
    date: fuelSupply.date,
    price: fuelSupply.price,
    pricePerLiter: fuelSupply.pricePerLiter,
  } as IFuelSupplyPayload;
}
