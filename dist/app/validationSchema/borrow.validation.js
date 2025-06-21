"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const BorrowZodSchema = zod_1.default.object({
    book: zod_1.default.string(),
    quantity: zod_1.default.number(),
    dueDate: zod_1.default.string(),
});
exports.default = BorrowZodSchema;
