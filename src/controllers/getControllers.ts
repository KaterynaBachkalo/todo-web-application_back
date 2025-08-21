import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Task } from "../models";

const getTasks = catchAsync(async (req: Request, res: Response) => {
  const tasks = await Task.findAll();

  res.status(200).json(tasks);
});

export default {
  getTasks,
};
