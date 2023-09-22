import { rideService } from "@/services/ride";
import { getSessionUser } from "../../auth/[...nextauth]/functions/getSessionUser";
import { withErrorHandler } from "../../utils/withErrorHandler";
import { responses } from "../../utils/responses";
import { ridePatchSchema } from "./schemas/ridePatchSchema";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const user = await getSessionUser();

    if (!user) {
      return responses.unauthenticated();
    }
    const body = await request.json();

    const payload = ridePatchSchema.safeParse(body);

    if (!payload.success) {
      const { errors } = payload.error;
      return responses.validation({ errors });
    }

    const ridePayload = payload.data;

    const rideResponse = await rideService.patch(params.id, {
      ...ridePayload,
      driverId: user.id,
    });

    return responses.created({ data: rideResponse });
  });
}
