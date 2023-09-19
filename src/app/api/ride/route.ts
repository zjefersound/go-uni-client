import { rideService } from "@/services/ride";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "../auth/[...nextauth]/functions/getSessionUser";
import { throwResponse } from "../utils/throwResponse";

const rideBillSchema = z.object({
  amount: z.number(),
  payerId: z.string().min(36).optional(),
  description: z.string(),
});

const rideSchema = z.object({
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

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();

    if (!user) {
      const response = {
        status: "unauthenticated",
        error: { message: "User not authenticated" },
      };
      return throwResponse({ status: 403, response });
    }
    const body = await request.json();

    const payload = rideSchema.safeParse(body);

    // If the request body is invalid, return a 400 error with the validation errors
    if (!payload.success) {
      const { errors } = payload.error;
      const response = {
        status: "invalid",
        error: { message: "Invalid request", errors },
      };
      return throwResponse({ status: 400, response });
    }

    const ridePayload = payload.data;
    const rideResponse = await rideService.create({
      ...ridePayload,
      driverId: user.id,
    });

    const response = {
      status: "success",
      data: {
        ridePayload,
        rideResponse,
        message: "Okay dude!",
      },
    };

    return throwResponse({ status: 201, response });

  } catch (error: any) {
    const errorResponse = {
      status: "error",
      message: error.message,
    };
    return throwResponse({ status: 500, response: errorResponse });
  }
}
