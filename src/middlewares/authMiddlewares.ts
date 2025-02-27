import { NextFunction, Request, Response } from "express";
import { catchAsync, HttpError, validSchemas } from "../utils";
import { jwtServices, userServices } from "../services";
import { User } from "../models";

interface MyCustomRequest extends Request {
  user?: any;
}

const checkRegistrationData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.addUserSchema.validate(req.body);

    if (error) throw new HttpError(400, error.message);

    await userServices.checkUserEmailExists(value.email);

    if (value.name === "") value.name = "NONAME";

    req.body = value;

    next();
  }
);

const checkLoginData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.addUserSchema.validate(req.body);

    if (error) throw new HttpError(400, error.message);

    req.body = value;

    next();
  }
);

const protect = catchAsync(
  async (req: MyCustomRequest, res: Response, next: NextFunction) => {
    const accessToken =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];

    const userId = accessToken && jwtServices.checkToken(accessToken);

    if (!userId) throw new HttpError(401, "Not authorized");

    const currentUser = await User.findById(userId);

    if (!currentUser || !currentUser.accessToken)
      throw new HttpError(401, "Not authorized");

    req.user = currentUser;

    next();
  }
);

const checkCurrentUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.updateUserSchema.validate(req.body);

    if (error) throw new HttpError(400, error.message);

    req.body = value;

    next();
  }
);

const checkPetData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.addPetSchema.validate(req.body);

    if (error) throw new HttpError(400, error.message);

    req.body = value;
    console.log(req.body);
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
