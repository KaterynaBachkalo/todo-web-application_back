import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const checkFavoritesId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);

const checkAddFavorites = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);

export default {
  checkFavoritesId,
  checkAddFavorites,
};
