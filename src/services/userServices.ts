import { CreationOptional } from "sequelize";
import serverConfig from "../configs/serverConfig";
import User from "../models/userModel";
import HttpError from "../utils/HttpError";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

interface registrationData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const checkUserEmailExists = async (email: string) => {
  const emailExists = await User.findOne({ where: { email } });

  if (emailExists) throw new HttpError(409, "Email in use");
};

const registration = async (data: registrationData) => {
  const newUserData = {
    ...data,
  };

  const newUser = await User.create(newUserData);

  newUser.password = "";

  return {
    user: newUser,
  };
};

const login = async ({ email, password }: LoginData) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new HttpError(401, "User with this email not found");

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw new HttpError(401, "Your password is wrong");

  const accessToken = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn:
      process.env.NODE_ENV === "production" ? "120m" : serverConfig.jwtExpires,
  });

  const refreshToken = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn: process.env.NODE_ENV === "production" ? "7d" : "1d",
  });

  user.accessToken = accessToken;
  user.refreshToken = refreshToken;

  await user.save();

  return {
    user: {
      email: user.email,
      name: user.name,
    },
    accessToken,
    refreshToken,
  };
};

interface IUserData {
  name: string;
}

const updateCurrentUser = async (
  userId: CreationOptional<number>,
  userData: IUserData
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user.update({
    name: userData.name,
  });
};

interface GoogleData {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
}

const authGoogle = async (userData: GoogleData) => {
  const { email } = userData;

  let user = await User.findOne({ where: { email } });

  if (!user) {
    user = await User.create({
      name: userData.name,
      email: userData.email,
      // verify: userData.verified_email,
      googleId: userData.id,
      password: uuidv4(),
    });
  }

  const accessToken = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn:
      process.env.NODE_ENV === "production" ? "120m" : serverConfig.jwtExpires,
  });

  const refreshToken = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn: process.env.NODE_ENV === "production" ? "7d" : "1d",
  });

  user.accessToken = accessToken;
  user.refreshToken = refreshToken;

  await user.save();

  return { accessToken, refreshToken };
};

export default {
  checkUserEmailExists,
  registration,
  login,
  updateCurrentUser,
  authGoogle,
};
