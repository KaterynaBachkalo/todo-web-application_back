import { Request, Response } from "express";
import { User } from "../models";
import { ObjectId } from "mongodb";
import { userServices, createAvatar } from "../services";
import { catchAsync, HttpError } from "../utils";
import { IMyPet } from "../types";

interface CustomRequest extends Request {
  user: {
    _id: ObjectId;
    email: string;
    name: string;
    favorites: string[];
    viewed: string[];
    avatar: string;
    phone: number;
    myPets: IMyPet[];
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
      viewed: user.viewed,
      avatar: user.avatar,
      phone: user.phone,
      myPets: user.myPets,
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

const updateAvatar = catchAsync(async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;

  if (!req.file) {
    throw new HttpError(400, "Please, upload the image");
  }

  const avatar = await createAvatar(req.user, req.file);

  await User.findByIdAndUpdate(_id, { avatar });

  res.status(200).json({
    avatar,
  });
});

export default {
  registration,
  login,
  refreshToken,
  logout,
  updateAvatar,
};
