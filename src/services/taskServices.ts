import { DataTypes, Op } from "sequelize";
import { Task } from "../models";
import { ITask, QueryParams } from "../types";

const getTasks = async (query: QueryParams) => {
  console.log("query", query);

  // INIT DB QUERY ================================

  const where: any = {
    text: {
      [Op.like]: `%${query.text || ""}%`,
    },
  };

  if (query.status && query.status !== "all") {
    where.status = query.status;
  }

  const tasks = await Task.findAll({
    where,
    order: [
      [
        "priority",
        query.sort && query.sort.toUpperCase() === "ASC" ? "ASC" : "DESC",
      ],
    ],
  });

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
