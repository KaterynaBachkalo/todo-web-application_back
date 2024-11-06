import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const checkRegistrationData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
