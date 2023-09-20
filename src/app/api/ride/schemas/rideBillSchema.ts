import { z } from "zod";

export const rideBillSchema = z.object({
  amount: z.number(),
  payerId: z.string().min(36).optional(),
  description: z.string(),
});
