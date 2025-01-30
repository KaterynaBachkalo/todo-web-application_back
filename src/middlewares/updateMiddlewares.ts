import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Favorite } from "../models";
import { HttpError } from "../utils";

const checkFavoritesId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const idExists = await Favorite.exists({ _id: id });

    if (idExists) throw new HttpError(409, "Favorite already exists");

    next();
  }
);

export default {
  checkFavoritesId,
};
