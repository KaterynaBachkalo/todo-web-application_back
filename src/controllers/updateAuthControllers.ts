import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { userServices } from "../services";
import { CreationOptional } from "sequelize";

interface CustomRequest extends Request {
  user: {
    id: CreationOptional<number>;
    name: string;
    phone: number;
  };
}

const updateCurrentUser = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { id } = req.user;

    const updateUser = await userServices.updateCurrentUser(id, req.body);

    res.status(200).json(updateUser);
  }
);

export default {
  updateCurrentUser,
};
