import express,{ Request, Response } from "express";
import BookZodSchema from "../validationSchema/book.validation";
import { Book } from "../models/book.model";

export const bookRouter = express.Router();

bookRouter.post("/", async(req : Request, res: Response)=>{
    try {
        const body = await BookZodSchema.parseAsync(req.body)
        const data = await Book.create(body)
        res.status(201).json({
            success : true,
            message: "Book created successfully",
            data
        })
        
    } catch (error:any) {
        console.log(error)
        res.status(400).json({
            success: false,
            message : error.message,
            error
        })
    }
})