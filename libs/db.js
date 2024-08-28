import mongoose from "mongoose";
import dotenv from "dotenv";



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;