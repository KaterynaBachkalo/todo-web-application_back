import { DataTypes, Op } from "sequelize";
import { Task } from "../models";
import { ITask, QueryParams } from "../types";

const getTasks = async (query: QueryParams) => {
  // INIT DB QUERY ================================

  const where: any = {
    text: {
      [Op.like]: `%${query.search || ""}%`,
    },
  };

  if (query.status && query.status !== "all") {
    where.status = query.status;
  }

  const findOptions: any = { where };

  if (query.sort) {
    findOptions.order = [
      ["priority", query.sort.toUpperCase() === "ASC" ? "ASC" : "DESC"],
    ];
  }

  const tasks = await Task.findAll(findOptions);

  return tasks;
};

const addTask = async (taskData: ITask) => {
  const newTask = await Task.create({ ...taskData });

  return newTask;
};

export default {
  getTasks,
  addTask,
};
