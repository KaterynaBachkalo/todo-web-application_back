import { DataTypes, Op } from "sequelize";
import { Task } from "../models";
import { ITask, QueryParams } from "../types";

const getTasks = async (query: QueryParams) => {
  // SEARCH FEATURE =====================================

  const findOptions: Record<string, unknown> = {};

  // Пошук по name
  if (typeof query.text === "string" && query.text.trim() !== "") {
    findOptions.text = new RegExp(query.text, "i");
  }

  // Фільтрація по status
  if (query.status && ["all", "done", "undone"].includes(query.status)) {
    findOptions.status = query.status;
  }

  // INIT DB QUERY ================================

  const tasks = await Task.findAll({
    where: findOptions,
    order: [["priority", "DESC"]],
  });

  return {
    tasks,
  };
};

const addTask = async (taskData: ITask) => {
  const newTask = await Task.create({ ...taskData });

  return newTask;
};

export default {
  getTasks,
  addTask,
};
