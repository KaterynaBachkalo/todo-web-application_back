import dotenv from "dotenv";
dotenv.config();

const serverConfig = {
  PORT: process.env.PORT || 4000,
  baseUrl: process.env.BASE_URL ?? "http://localhost:4000",
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DB_PORT,
};

export default serverConfig;
