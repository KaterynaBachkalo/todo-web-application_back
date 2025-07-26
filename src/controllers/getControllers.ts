import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { contactServices, jwtServices } from "../services";
import { Contact } from "../models";

const getContacts = catchAsync(async (req: Request, res: Response) => {
  const accessToken =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = accessToken && jwtServices.checkToken(accessToken);

  console.log("userId", userId);

  const contacts =
    // await contactServices.getContacts(req.query);
    await Contact.findAll({ where: { user_id: userId } });

  res.status(200).json({
    contacts,
    // totalContacts,
    // page,
    // limit,
  });
});

export default {
  getContacts,
};
