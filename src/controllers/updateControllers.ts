import { Request, Response } from "express";
import { ObjectId } from "mongoose";

import catchAsync from "../utils/catchAsync";
import { Favorite, User } from "../models";
import { HttpError } from "../utils";
import { userServices } from "../services";

interface CustomRequest extends Request {
  user: { _id: ObjectId; email: string; name: string; favorites: string };
}

const checkAuthorization = (userId: ObjectId) => {
  if (!userId) {
    throw new HttpError(401, "Unauthorized");
  }
};

const addFavorites = catchAsync(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const userId = req.user._id;

  checkAuthorization(userId);

  const favorites = await userServices.updateFavoriteId(userId, id);

  await Favorite.create({ _id: id, owner: userId });

  res.status(201).json(favorites);
});

const deleteFavorites = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    const userId = req.user._id;

    checkAuthorization(userId);

    await userServices.updateFavoriteId(userId, id);

    const deletedFavorite = await Favorite.findOneAndDelete({
      _id: id,
      owner: userId,
    });

    if (!deletedFavorite) {
      throw new HttpError(404, "Favorite not found");
    }

    await User.findByIdAndUpdate(userId, { $pull: { favorites: id } });

    res
      .status(200)
      .json({ message: "The favorite pet is successfully deleted" });
  }
);

export default {
  deleteFavorites,
  addFavorites,
};
