import { CreationOptional } from "sequelize";

export interface ITask {
  id?: CreationOptional<number>;
  text: string;
  status: "done" | "undone";
  priority: number;
}

export interface QueryParams {
  text?: string | null;
  status?: "done" | "undone";
  priority?: number;
}
