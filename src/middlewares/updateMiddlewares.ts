import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Contact } from "../models";
import { HttpError } from "../utils";
import { jwtServices } from "../services";

const checkNumber = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;

    const accessToken =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];

    const userId = accessToken && jwtServices.checkToken(accessToken);

    const phoneExists = await Contact.findOne({
      where: { phone, user_id: userId },
    });

    if (phoneExists) throw new HttpError(409, "Notice already exists");

    next();
  }
);

export default {
  checkNumber,
};
