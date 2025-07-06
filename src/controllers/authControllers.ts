import { Request, Response } from "express";
import { User } from "../models";
import { jwtServices, userServices } from "../services";
import { catchAsync, HttpError } from "../utils";
import { CreationOptional } from "sequelize";

interface CustomRequest extends Request {
  user: {
    id: CreationOptional<number>;
    email: string;
    name: string;
  };
}

const registration = catchAsync(async (req: Request, res: Response) => {
  const { user } = await userServices.registration(req.body);

  res.status(201).json({ user: { email: user.email, name: user.name } });
});

const login = catchAsync(async (req: CustomRequest, res: Response) => {
  const { user, accessToken, refreshToken } = await userServices.login(
    req.body
  );

  res.status(200).json({
    user: {
      email: user.email,
      name: user.name,
    },
    accessToken,
    refreshToken,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const result = await jwtServices.refreshToken(token);
    res.json(result);
  } catch (error: any) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
});

const logout = catchAsync(async (req: CustomRequest, res: Response) => {
  const { id } = req.user;

  const user = await User.findByPk(id);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  await user.update({ accessToken: "", refreshToken: "" });

  res.status(204).json();
});

export default {
  registration,
  login,
  refreshToken,
  logout,
};
