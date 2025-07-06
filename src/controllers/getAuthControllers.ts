import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { CreationOptional } from "sequelize";

interface CustomRequest extends Request {
  user: {
    id: CreationOptional<number>;
    email: string;
    name: string;
  };
}

const getCurrentUserInfo = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { email, name } = req.user;
    res.status(200).json({ email, name });
  }
);

export default {
  getCurrentUserInfo,
};
