import { DataTypes } from "sequelize";
import sequelize from "../configs/config";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface ContactModel
  extends Model<
    InferAttributes<ContactModel>,
    InferCreationAttributes<ContactModel>
  > {
  id: CreationOptional<number>;
  user_id?: number;
  name?: string;
  phone: string;
}

const Contact = sequelize.define<ContactModel>(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Contact;
