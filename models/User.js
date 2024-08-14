import mongoose from "mongoose";
import { Schema } from "mongoose";
// a mongoose Schema
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});
//export model
export const users = mongoose.model("Users", userSchema);
