import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  amount: z.coerce.number().min(1, "Min amount is 1"),
  type: z.string()
});
