import { Server } from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const MONGODB_URI = process.env.MONGODB_URL!;
const PORT = process.env.PORT || 3000;
let server: Server;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URL environment variable is not defined");
}

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB using Mongoose");
    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
