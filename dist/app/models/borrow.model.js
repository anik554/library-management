"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book id is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Copies must be a positive number, got {VALUE}"],
    },
    dueDate: { type: Date, required: [true, "Due Date is required"] },
}, {
    versionKey: false,
    timestamps: true,
});
borrowSchema.static("validateQuantity", function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookData = yield book_model_1.Book.findById(bookId);
        if (!bookData) {
            throw new Error("Book not found!");
        }
        if (bookData.copies < quantity) {
            throw new Error("Not enough copies available");
        }
        const result = yield book_model_1.Book.findByIdAndUpdate(bookId, { $inc: { copies: -quantity } }, { new: true });
        if ((result === null || result === void 0 ? void 0 : result.copies) === 0) {
            const brrowRecord = yield book_model_1.Book.findByIdAndUpdate(bookId, { $set: { available: false } }, { new: true });
            return brrowRecord;
        }
    });
});
borrowSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[Post-Save] "${doc.book}" was borrowed. Quantity: ${doc.quantity}`);
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
