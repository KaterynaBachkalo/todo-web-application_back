import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const registration = catchAsync(async (req: Request, res: Response) => {});

const login = catchAsync(async (req: Request, res: Response) => {});

const refreshToken = catchAsync(async (req: Request, res: Response) => {});

const logout = catchAsync(async (req: Request, res: Response) => {});

export default {
  registration,
  login,
  refreshToken,
  logout,
};
