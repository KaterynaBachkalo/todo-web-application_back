import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import { NextFunction, Request, Response } from "express";

import { tasksRouter } from "./routes/api";
import { proxyController } from "./controllers";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

const isDevelopment = process.env.NODE_ENV === "development";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:4000",
  "https://katerynabachkalo.github.io/todo-web-application",
  "https://todo-web-application-back-ooje.vercel.app",
  // Add common Vercel domains
  /^https:\/\/.*\.vercel\.app$/,
  /^https:\/\/.*\.vercel\.app$/,
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    // Allow all origins in development
    if (isDevelopment) {
      callback(null, true);
      return;
    }

    // In production, check against allowed origins
    if (!origin) {
      callback(null, true);
      return;
    }

    const isAllowed = allowedOrigins.some((allowed) => {
      if (typeof allowed === "string") {
        return allowed === origin;
      }
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.get("/api/proxy", proxyController);

app.get("/", (req: Request, res: Response) => {
  res.send("✅ API is working! Use /api/... routes.");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
