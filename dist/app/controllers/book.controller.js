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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_validation_1 = __importDefault(require("../validationSchema/book.validation"));
const book_model_1 = require("../models/book.model");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield book_validation_1.default.parseAsync(req.body);
        const data = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.bookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = req.query.filter;
        const sortParam = (_a = req.query.sort) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const sortOrder = sortParam === "asc" ? 1 : -1;
        const sortBy = req.query.sortBy;
        const limit = parseInt(req.query.limit) || 10;
        let data = [];
        if (filter) {
            data = yield book_model_1.Book.find({ genre: filter })
                .sort({ [sortBy]: sortOrder })
                .limit(limit);
        }
        else {
            data = yield book_model_1.Book.find();
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.bookRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.bookRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        let updatedBody = req.body;
        const quantity = updatedBody.copies;
        const existingCopies = yield book_model_1.Book.findById(bookId);
        const newCopies = (existingCopies === null || existingCopies === void 0 ? void 0 : existingCopies.copies) + quantity;
        if (quantity > 0) {
            updatedBody.available = quantity > 0;
        }
        if (newCopies) {
            updatedBody.copies = newCopies;
        }
        const data = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBody, {
            new: true,
        });
        yield (data === null || data === void 0 ? void 0 : data.save());
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.bookRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
