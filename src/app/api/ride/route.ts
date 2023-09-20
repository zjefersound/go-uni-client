import { rideService } from "@/services/ride";
import { getSessionUser } from "../auth/[...nextauth]/functions/getSessionUser";
import { rideSchema } from "./schemas/rideSchema";
import { withErrorHandler } from "../utils/withErrorHandler";
import { responses } from "../utils/responses";

export async function POST(request: Request) {
  withErrorHandler(async () => {
    const user = await getSessionUser();

    if (!user) {
      return responses.unauthenticated();
    }
    const body = await request.json();

    const payload = rideSchema.safeParse(body);

    if (!payload.success) {
      const { errors } = payload.error;
      return responses.validation({ errors });
    }

    const ridePayload = payload.data;

    const rideResponse = await rideService.create({
      ...ridePayload,
      driverId: user.id,
    });

    return responses.created({ data: rideResponse });
  });
}
