import { CreationOptional } from "sequelize";

export interface ITask {
  id?: CreationOptional<number>;
  text: string;
  status: "done" | "undone";
  priority: number;
}

export interface QueryParams {
  search?: string | null;
  status?: "all" | "done" | "undone";
  sort?: "asc" | "desc";
}
