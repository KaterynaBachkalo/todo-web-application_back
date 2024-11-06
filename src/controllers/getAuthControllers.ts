import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const getCurrentUserInfo = catchAsync(
  async (req: Request, res: Response) => {}
);

const getCurrentUserFullInfo = catchAsync(
  async (req: Request, res: Response) => {}
);

export default {
  getCurrentUserInfo,
  getCurrentUserFullInfo,
};
