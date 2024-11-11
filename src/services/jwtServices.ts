import jwt from "jsonwebtoken";
import { HttpError } from "../utils";
import serverConfig from "../configs/serverConfig";
import { User } from "../models";

const checkToken = (token: string) => {
  if (!token) throw new HttpError(401, "Not authorized");

  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret) as { id: string };

    return id;
  } catch (err) {
    throw new HttpError(401, "Not authorized");
  }
};

const refreshToken = async (token: string) => {
  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret) as {
      id: string;
    };

    const user = await User.findById(id);

    if (!user || user.refreshToken !== token) {
      throw new HttpError(401, "Invalid refresh token");
    }

    const newAccessToken = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
      expiresIn:
        process.env.NODE_ENV === "production"
          ? "120m"
          : serverConfig.jwtExpires,
    });

    user.accessToken = newAccessToken;

    await user.save();

    return {
      accessToken: newAccessToken,
      refreshToken: user.refreshToken,
    };
  } catch (error) {
    throw new HttpError(401, "Invalid refresh token");
  }
};

export default { checkToken, refreshToken };
