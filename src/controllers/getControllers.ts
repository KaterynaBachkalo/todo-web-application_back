import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Task } from "../models";
import { taskServices } from "../services";

const getTasks = catchAsync(async (req: Request, res: Response) => {
  const tasks = await taskServices.getTasks(req.query);

  res.status(200).json(tasks);
});

export default {
  getTasks,
};
