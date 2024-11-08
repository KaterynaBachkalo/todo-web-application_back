import { NextFunction, Request, Response } from "express";
import userServices from "../services/userServices";
import { catchAsync, HttpError, validSchemas } from "../utils";

const checkRegistrationData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.addUserSchema.validate(req.body);

    if (error) throw new HttpError(400, error.message);

    await userServices.checkUserEmailExists(value.email);

    req.body = value;

    next();
  }
);

const checkLoginData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);

const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);

const checkCurrentUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);

const checkPetData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);

export default {
  checkRegistrationData,
  checkLoginData,
  protect,
  checkCurrentUser,
  checkPetData,
};
