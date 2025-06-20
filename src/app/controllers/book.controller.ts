import express, { Request, Response } from "express";
import BookZodSchema from "../validationSchema/book.validation";
import { Book } from "../models/book.model";

export const bookRouter = express.Router();

bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = await BookZodSchema.parseAsync(req.body);
    const data = await Book.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
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

bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string | undefined;
    const sortParam = (req.query.sort as string)?.toLowerCase();
    const sortOrder = sortParam === "asc" ? 1 : -1;
    const sortBy = req.query.sortBy as string;
    const limit = parseInt(req.query.limit as string) || 10;
    let data = [];
    if (filter) {
      data = await Book.find({ genre: filter })
        .sort({ [sortBy]: sortOrder })
        .limit(limit);
    } else {
      data = await Book.find();
    }

    res.status(200).json({
      success: true,
      message: "Book created successfully",
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
