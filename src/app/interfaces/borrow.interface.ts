import { Model, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
export interface BorrowStaticMethods extends Model<IBorrow>{
   validateQuantity(bookId: string, quantity: number): void;
}
