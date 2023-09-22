import { z } from "zod";

export const rideBillSchema = z.object({
  amount: z.number(),
  description: z.string(),
  payerId: z.string().min(36).optional(),
  paid: z.boolean().optional(),
});
