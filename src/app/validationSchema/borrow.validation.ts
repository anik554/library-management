import z from "zod";

const BorrowZodSchema = z.object({
  book: z.string(),
  quantity: z.number(),
  dueDate: z.string(),
});

export default BorrowZodSchema;
