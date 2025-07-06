import dotenv from "dotenv";
dotenv.config();

const serverConfig = {
  PORT: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET ?? "secret-phrase",
  jwtExpires: process.env.JWT_EXPIRES ?? "20h",
  baseUrl: process.env.BASE_URL ?? "http://localhost:4000",
  cloudinaryName: process.env.CLOUDINARY_NAME ?? "cloudinaryName",
  cloudinaryKey: process.env.CLOUDINARY_KEY ?? "12345",
  cloudinarySecret: process.env.CLOUDINARY_SECRET ?? "cloudinarySecret",
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DB_PORT,
};

export default serverConfig;
