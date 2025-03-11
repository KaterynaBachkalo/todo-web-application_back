import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { ObjectId } from "mongoose";
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

const getCurrentUserInfo = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { email, name, favorites, viewed, avatar, phone, myPets } = req.user;
    res
      .status(200)
      .json({ email, name, favorites, avatar, phone, myPets, viewed });
  }
);

export default {
  getCurrentUserInfo,
};
