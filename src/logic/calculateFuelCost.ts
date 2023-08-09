export function calculateFuelCost({
  distance = 0,
  distancePerLiter = 0,
  fuelPrice = 0,
}) {
  const fuelLiters = distance / distancePerLiter
  return fuelLiters * fuelPrice;
}
