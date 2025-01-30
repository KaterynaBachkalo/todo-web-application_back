import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { ObjectId } from "mongoose";

interface CustomRequest extends Request {
  user: { _id: ObjectId; email: string; name: string; favorites: string[] };
}

const getCurrentUserInfo = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { email, name, favorites } = req.user;
    res.status(200).json({ email, name, favorites });
  }
);

const getCurrentUserFullInfo = catchAsync(
  async (req: Request, res: Response) => {}
);

export default {
  getCurrentUserInfo,
  getCurrentUserFullInfo,
};
