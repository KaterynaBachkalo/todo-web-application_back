import { genSalt, hash, compare } from "bcrypt";
import sequelize from "../configs/config";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import Contact from "./contactModel";

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  googleId: string | null;
  checkPassword: (candidate: string, passwdHash: string) => Promise<boolean>;
  accessToken: string | null;
  refreshToken: string | null;
}

declare module "sequelize" {
  interface Model {
    checkPassword?: (candidate: string, passwdHash: string) => Promise<boolean>;
  }
}

const User = sequelize.define<UserModel>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,

    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await genSalt(10);
          user.password = await hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await genSalt(10);
          user.password = await hash(user.password, salt);
        }
      },
    },
    defaultScope: {},
  }
);

User.hasMany(Contact, { foreignKey: "user_id" });
Contact.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

User.prototype.checkPassword = async function (
  candidate: string,
  passwdHash: string
): Promise<boolean> {
  return compare(candidate, passwdHash);
};

export default User;
