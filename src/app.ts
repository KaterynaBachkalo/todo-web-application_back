import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import { NextFunction, Request, Response } from "express";

import {
  noticesRouter,
  citiesRouter,
  friendsRouter,
  newsRouter,
  authRouter,
} from "./routes/api";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/notices", noticesRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/news", newsRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
