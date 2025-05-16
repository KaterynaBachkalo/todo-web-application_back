import app from "../src/app";
import mongoose from "mongoose";
import serverConfig from "../src/configs/serverConfig";

let isConnected = false;

export default async function handler(req: any, res: any) {
  if (!isConnected) {
    try {
      await mongoose.connect(serverConfig.mongoUrl);
      isConnected = true;
      console.log("Connected to MongoDB (via Vercel)");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      res.status(500).json({ message: "Database connection failed" });
      return;
    }
  }

  return app(req, res);
}
