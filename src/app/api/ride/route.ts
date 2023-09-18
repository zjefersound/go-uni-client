import { rideService } from "@/services/ride";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "../auth/[...nextauth]/functions/getSessionUser";

const selectedPassengersSchema = z.object({
  oneWay: z.boolean(),
  userId: z.string().min(36).optional(),
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
  selectedPassengers: z.array(selectedPassengersSchema),
});

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();

    if (!user) {
      const response = {
        error: { message: "User not authenticated" },
      };
      return new NextResponse(JSON.stringify(response), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    const body = await request.json();

    const payload = rideSchema.safeParse(body);

    // If the request body is invalid, return a 400 error with the validation errors
    if (!payload.success) {
      const { errors } = payload.error;
      const response = {
        error: { message: "Invalid request", errors },
      };
      return new NextResponse(JSON.stringify(response), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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

    return new NextResponse(JSON.stringify(response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const errorResponse = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
