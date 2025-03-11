import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { jwtServices, petServices, userServices } from "../services";
import { ObjectId } from "mongoose";
import { HttpError } from "../utils";
import { createPetAvatar } from "../services/avatarServices";
import { AddPet } from "../models";

interface CustomRequest extends Request {
  user: {
    _id: ObjectId;
    name: string;
    phone: number;
  };
}

interface CustomPetRequest extends Request {
  user: {
    _id: ObjectId;
    name: string;
    phone: number;
    myPets: {
      _id: ObjectId;
      title: string;
      name: string;
      sex: string;
      birthday: string;
      species: string;
      imgURL: string;
    }[];
  };
}

const checkAuthorization = (userId: ObjectId) => {
  if (!userId) {
    throw new HttpError(401, "Unauthorized");
  }
};

const updateCurrentUser = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { _id } = req.user;

    const updateUser = await userServices.updateCurrentUser(_id, req.body);

    res.status(200).json(updateUser);
  }
);

const deletePetById = catchAsync(
  async (req: CustomPetRequest, res: Response) => {
    const { id } = req.params;

    const userId = req.user._id;

    checkAuthorization(userId);

    const deletedPet = await AddPet.findOneAndDelete({
      _id: id,
      owner: userId,
    });

    if (!deletedPet) {
      throw new HttpError(404, "Pet is not found");
    }

    await userServices.updatePets(userId, id);

    res
      .status(200)
      .json({ message: "The favorite pet is successfully deleted" });
  }
);

const addPet = catchAsync(async (req: CustomPetRequest, res: Response) => {
  const accessToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!accessToken) {
    throw new HttpError(401, "Unauthorized. No token provided.");
  }

  const userId = accessToken && jwtServices.checkToken(accessToken);

  let newPet;

  if (!req.file) {
    // throw new HttpError(400, "Please, upload the image");
    newPet = await petServices.addPet(userId, {
      ...req.body,
      imgURL: null,
    });
  } else {
    const avatar = await createPetAvatar(userId, req.file);

    newPet = await petServices.addPet(userId, {
      ...req.body,
      imgURL: avatar,
    });
  }

  if (!userId) {
    throw new HttpError(401, "Unauthorized. Invalid token.");
  }

  await userServices.updatePetsOfUser(userId, newPet);

  res.status(201).json(newPet);
});

export default {
  updateCurrentUser,
  deletePetById,
  addPet,
};
