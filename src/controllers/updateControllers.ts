import { Request, Response } from "express";
import { ObjectId } from "mongoose";

import catchAsync from "../utils/catchAsync";
import { AddPet, Favorite, Notice, User, Viewed } from "../models";
import { HttpError } from "../utils";
import { userServices } from "../services";

interface CustomRequest extends Request {
  user: {
    _id: ObjectId;
    email: string;
    name: string;
    favorites: string[];
    viewed: string[];
  };
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

const addViewed = catchAsync(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const userId = req.user._id;

  checkAuthorization(userId);

  const viewed = await userServices.updateViewedId(userId, id);

  await Viewed.create({ _id: id, owner: userId });

  res.status(201).json(viewed);
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

const addToNotices = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const myPet = await AddPet.findById(id);

  if (!myPet) {
    return res.status(404).json({ message: "Pet not found" });
  }

  const notice = new Notice({
    _id: myPet._id,
    name: myPet.name,
    title: myPet.title,
    imgURL: myPet.imgURL,
    species: myPet.species,
    birthday: myPet.birthday,
    sex: myPet.sex,
    owner: myPet.owner,
  });

  await notice.save();

  res.status(201).json(notice);
});

const deleteMyPetFromNotice = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    const deletedPet = await Notice.findOneAndDelete({
      _id: id,
    });

    if (!deletedPet) {
      throw new HttpError(404, "Favorite not found");
    }

    res.status(200).json({
      message: "Your pet is successfully removed from publication",
    });
  }
);

export default {
  deleteFavorites,
  addFavorites,
  addViewed,
  addToNotices,
  deleteMyPetFromNotice,
};
