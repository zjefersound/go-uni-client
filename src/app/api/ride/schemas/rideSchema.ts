import { z } from "zod";
import { rideBillSchema } from "./rideBillSchema";

export const rideSchema = z.object({
  date: z.string(),
  paid: z.boolean(),
  tripId: z.string().min(36),
  carId: z.string().min(36),
  passengers: z.number().int(),
  passengersOneWay: z.number().int(),
  pricePerPassenger: z.number().gte(0),
  extraCosts: z.number().gte(0),
  observations: z.string(),
  bills: z.array(rideBillSchema),
});
