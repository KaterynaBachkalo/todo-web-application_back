import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { ObjectId } from "mongoose";

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

const getCurrentUserInfo = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { email, name, favorites, avatar, phone } = req.user;
    res.status(200).json({ email, name, favorites, avatar, phone });
  }
);

const getCurrentUserFullInfo = catchAsync(
  async (req: Request, res: Response) => {}
);

export default {
  getCurrentUserInfo,
  getCurrentUserFullInfo,
};
