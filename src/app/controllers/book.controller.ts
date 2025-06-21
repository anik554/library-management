import express, { Request, Response, Router } from "express";
import BookZodSchema from "../validationSchema/book.validation";
import { Book } from "../models/book.model";
import mongoose from "mongoose";

export const bookRouter: Router = express.Router();

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
      message: "Books retrieved successfully",
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

bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        success: false,
        message: "Invalid book id format",
        error: {
          name: "Invalid Object id",
          value: bookId,
        },
      });
      return;
    }
    const data = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
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

bookRouter.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        success: false,
        message: "Invalid book id format",
        error: {
          name: "Invalid Object id",
          value: bookId,
        },
      });
      return;
    }
    let updatedBody = req.body;
    const quantity = updatedBody.copies;
    const existingCopies = await Book.findById(bookId);
    const newCopies = existingCopies?.copies + quantity;
    if (quantity > 0) {
      updatedBody.available = quantity > 0;
    }
    if (newCopies) {
      updatedBody.copies = newCopies;
    }
    const data = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });
    await data?.save();
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
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

bookRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        success: false,
        message: "Invalid book id format",
        error: {
          name: "Invalid Object id",
          value: bookId,
        },
      });
      return;
    }
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
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
