import { DataTypes } from "sequelize";
import sequelize from "../configs/config";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface TaskModel
  extends Model<
    InferAttributes<TaskModel>,
    InferCreationAttributes<TaskModel>
  > {
  id: CreationOptional<number>;
  text: string;
  status: "all" | "done" | "undone";
  priority: number;
}

const Task = sequelize.define<TaskModel>(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("done", "undone"),
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default Task;
