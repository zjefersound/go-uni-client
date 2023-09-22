import { z } from "zod";

export const rideBillPatchSchema = z.object({
  amount: z.number(),
  description: z.string(),
  payerId: z.string().min(36).optional(),
  paid: z.boolean().optional(),
  _id: z.string().optional(),
});
