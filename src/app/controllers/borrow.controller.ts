import express, { Request, Response } from "express"
import BorrowZodSchema from "../validationSchema/borrow.validation";
import { Borrow } from "../models/borrow.model";
export const borrowRouter = express.Router();

borrowRouter.post("/", async(req : Request, res: Response)=>{
    try {
        const body = await BorrowZodSchema.parseAsync(req.body)
        const data = await Borrow.create(body)
        res.status(201).json({
            success : true,
            message: "Book borrowed successfully",
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

