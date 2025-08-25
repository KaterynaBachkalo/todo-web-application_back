require("dotenv").config();

const common = {
  dialect: "mariadb",
  host: process.env.DATABASE_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialectOptions: {
    charset: "utf8mb4",
    ...(String(process.env.DB_SSL || "").toLowerCase() === "true"
      ? { ssl: { rejectUnauthorized: true } }
      : {}),
  },
};

module.exports = {
  development: { ...common },
  test: { ...common },
  production: { ...common },
};
