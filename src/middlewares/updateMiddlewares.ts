import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Contact } from "../models";
import { HttpError } from "../utils";

const checkContactId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const idExists = await Contact.findByPk(id);

    if (idExists) throw new HttpError(409, "Notice already exists");

    next();
  }
);

export default {
  checkContactId,
};
