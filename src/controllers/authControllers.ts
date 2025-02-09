import { Request, Response } from "express";
import { User } from "../models";
import { ObjectId } from "mongodb";
import { userServices } from "../services";
import { catchAsync } from "../utils";

interface CustomRequest extends Request {
  user: {
    _id: ObjectId;
    email: string;
    name: string;
    favorites: string[];
    avatar: string;
    phone: number;
  };
}

const registration = catchAsync(async (req: Request, res: Response) => {
  const { user } = await userServices.registration(req.body);

  res.status(201).json({ user: { email: user.email, name: user.name } });
});

const login = catchAsync(async (req: CustomRequest, res: Response) => {
  const { user, accessToken, refreshToken } = await userServices.login(
    req.body
  );

  res.status(200).json({
    user: {
      email: user.email,
      name: user.name,
      favorites: user.favorites,
      avatar: user.avatar,
      phone: user.phone,
    },
    accessToken,
    refreshToken,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {});

const logout = catchAsync(async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });

  res.status(204).json();
});

export default {
  registration,
  login,
  refreshToken,
  logout,
};
