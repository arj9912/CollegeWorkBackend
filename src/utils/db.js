import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const connectDB = mongoose.connect(process.env.MONGODB_URL);

export default connectDB;
