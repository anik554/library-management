import express, { Request, Response, Router } from "express";
import BorrowZodSchema from "../validationSchema/borrow.validation";
import { Borrow } from "../models/borrow.model";
export const borrowRouter: Router = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = await BorrowZodSchema.parseAsync(req.body);
    const { book: bookId, quantity } = body;
    await Borrow.validateQuantity(bookId, quantity);
    const data = await Borrow.create(body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          book: { isbn: "$book.isbn", title: "$book.title" },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
