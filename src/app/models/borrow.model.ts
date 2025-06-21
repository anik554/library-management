import { model, Schema } from "mongoose";
import { BorrowStaticMethods, IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book id is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Copies must be a positive number, got {VALUE}"],
    },
    dueDate: { type: Date, required: [true, "Due Date is required"] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.static("validateQuantity", async function(
  bookId: string,
  quantity: number
) {
  const bookData = await Book.findById(bookId);
  if (!bookData) {
    throw new Error("Book not found!");
  }
  if (bookData.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  const result = await Book.findByIdAndUpdate(
    bookId,
    { $inc: { copies: -quantity } },
    { new: true }
  );

  if (result?.copies === 0) {
    const brrowRecord = await Book.findByIdAndUpdate(
      bookId,
      { $set: { available: false } },
      { new: true }
    );
    return brrowRecord;
  }
});

borrowSchema.post("save", async function(doc) {
  console.log(
    `[Post-Save] "${doc.book}" was borrowed. Quantity: ${doc.quantity}`
  );
});
export const Borrow = model<IBorrow, BorrowStaticMethods>(
  "Borrow",
  borrowSchema
);
