import { Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import { Task } from "../models";
import { HttpError } from "../utils";
import { taskServices } from "../services";

const addTasks = catchAsync(async (req: Request, res: Response) => {
  const newTask = await taskServices.addTask(req.body);

  res.status(201).json(newTask);
});

const deleteTasks = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedTask = await Task.destroy({ where: { id: id } });

  if (!deletedTask) {
    throw new HttpError(404, "Task not found");
  }

  res.status(200).json({
    message: "Your task is successfully removed",
  });
});

const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, text } = req.body;

  const updatedCount = await Task.update({ status }, { where: { id } });

  if (!updatedCount) {
    throw new HttpError(404, "Task not found");
  }

  const updatedTask = await Task.findByPk(id);

  res.status(200).json(updatedTask);
});

export default {
  addTasks,
  deleteTasks,
  changeStatus,
};
