import axios from "axios";
import { Request, Response } from "express";
import qs from "qs";
import { catchAsync } from "../utils";
import { userServices } from "../services";

const googleAuth = catchAsync(async (req: Request, res: Response) => {
  const stringifiedParams = qs.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.FRONTEND_URL}/api/users/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
});

const googleRedirect = catchAsync(async (req: Request, res: Response) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = qs.parse(urlObj.search, { ignoreQueryPrefix: true });
  const code = urlParams.code as string;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.FRONTEND_URL}/api/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { accessToken, refreshToken } = await userServices.authGoogle(
    userData.data
  );

  return res.redirect(
    `${process.env.FRONTEND_URL}/#/auth?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
});

export default {
  googleAuth,
  googleRedirect,
};
