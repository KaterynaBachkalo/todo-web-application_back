import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const postFavorites = catchAsync(async (req: Request, res: Response) => {});

const deleteFavorites = catchAsync(async (req: Request, res: Response) => {});

export default {
  deleteFavorites,
  postFavorites,
};
