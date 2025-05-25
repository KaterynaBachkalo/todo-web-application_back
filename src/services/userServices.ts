import mongoose, { ObjectId } from "mongoose";
import serverConfig from "../configs/serverConfig";
import { User } from "../models/userModel";
import HttpError from "../utils/HttpError";
import jwt from "jsonwebtoken";
import { IMyPet } from "../types";

interface registrationData {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

interface LoginData {
  email: string;
  password: string;
  favorites: string[];
  avatar: string;
  phone: number;
  myPets: IMyPet[];
}

const checkUserEmailExists = async (email: string) => {
  const emailExists = await User.exists({ email });

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
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new HttpError(401, "Email or password is wrong");

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw new HttpError(401, "Email or password is wrong");

  user.password = "";

  const accessToken = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn:
      process.env.NODE_ENV === "production" ? "120m" : serverConfig.jwtExpires,
  });

  const refreshToken = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn: process.env.NODE_ENV === "production" ? "7d" : "1d",
  });

  await User.findByIdAndUpdate(user.id, { accessToken, refreshToken });

  return {
    user: {
      email: user.email,
      name: user.name,
      favorites: user.favorites,
      viewed: user.viewed,
      avatar: user.avatar,
      phone: user.phone,
      myPets: user.myPets,
    },
    accessToken,
    refreshToken,
  };
};

const updateFavoriteId = async (userId: ObjectId, id: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: id } }, // `addToSet` не дозволяє дублювати значення
    { new: true }
  );

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user.favorites;
};

const updateViewedId = async (userId: ObjectId, id: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { viewed: id } }, // `addToSet` не дозволяє дублювати значення
    { new: true }
  );

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user.viewed;
};

interface IUserData {
  name: string;
  phone: string;
}

const updateCurrentUser = async (userId: ObjectId, userData: IUserData) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      name: userData.name,
      phone: userData.phone,
    },
    { new: true }
  );

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user;
};

const updatePetsOfUser = async (userId: string, myPets: IMyPet) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { myPets } },
    { new: true }
  );

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user.myPets;
};

const updatePets = async (userId: ObjectId, id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);

  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { myPets: { _id: objectId } } },
    { new: true }
  );

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user.myPets;
};

interface GoogleData {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

const authGoogle = async (userData: GoogleData) => {
  const { email } = userData;

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    user = await User.create({
      name: userData.name,
      email: userData.email,
      // verify: userData.verified_email,
      googleId: userData.id,
      avatar: userData.picture,
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
  updateFavoriteId,
  updateCurrentUser,
  updatePetsOfUser,
  updatePets,
  updateViewedId,
  authGoogle,
};
