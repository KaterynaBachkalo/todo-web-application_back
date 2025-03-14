import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Favorite, Notice, Viewed } from "../models";
import { HttpError } from "../utils";

const checkFavoritesId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const idExists = await Favorite.exists({ _id: id });

    if (idExists) throw new HttpError(409, "Favorite already exists");

    next();
  }
);

const checkViewedId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const idExists = await Viewed.exists({ _id: id });

    if (idExists) throw new HttpError(409, "Favorite already exists");

    next();
  }
);

const checkNoticesId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const idExists = await Notice.exists({ _id: id });

    if (idExists) throw new HttpError(409, "Notice already exists");

    next();
  }
);

export default {
  checkFavoritesId,
  checkViewedId,
  checkNoticesId,
};
