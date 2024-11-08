import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import userServices from "../services/userServices";

const registration = catchAsync(async (req: Request, res: Response) => {
  const { user } = await userServices.registration(req.body);

  res.status(201).json({
    user: { email: user.email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {});

const refreshToken = catchAsync(async (req: Request, res: Response) => {});

const logout = catchAsync(async (req: Request, res: Response) => {});

export default {
  registration,
  login,
  refreshToken,
  logout,
};
