import { Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import { Contact } from "../models";
import { HttpError } from "../utils";
import { CreationOptional } from "sequelize";
import { contactServices, jwtServices } from "../services";

interface CustomRequest extends Request {
  user: {
    id: CreationOptional<number>;
    email: string;
    name: string;
  };
}

const addContacts = catchAsync(async (req: CustomRequest, res: Response) => {
  const accessToken =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = accessToken && jwtServices.checkToken(accessToken);

  if (!userId) {
    throw new HttpError(401, "Not authorized");
  }

  const newContact = await contactServices.addContact(userId, req.body);

  res.status(201).json(newContact);
});

const deleteContacts = catchAsync(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const deletedContact = await Contact.destroy({ where: { id: id } });

  if (!deletedContact) {
    throw new HttpError(404, "Contact not found");
  }

  res.status(200).json({
    message: "Your contact is successfully removed",
  });
});

export default {
  addContacts,
  deleteContacts,
};
