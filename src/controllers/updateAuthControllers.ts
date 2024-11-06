import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const updateCurrentUser = catchAsync(async (req: Request, res: Response) => {});

const deletePetById = catchAsync(async (req: Request, res: Response) => {});

const addPet = catchAsync(async (req: Request, res: Response) => {});

export default {
  updateCurrentUser,
  deletePetById,
  addPet,
};
