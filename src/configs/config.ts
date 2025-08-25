import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import serverConfig from "./serverConfig";
import "mariadb";

const sequelize = new Sequelize({
  database: serverConfig.database,
  username: serverConfig.username,
  password: serverConfig.password,
  host: serverConfig.host,
  port: serverConfig.port ? Number(serverConfig.port) : undefined,
  dialect: "mariadb",
  dialectOptions: {
    charset: "utf8mb4",
    ssl: { rejectUnauthorized: true },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

export default sequelize;
