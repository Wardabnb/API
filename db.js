import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
//connect to mongoDB
export async function DBConnect() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB!");
}
