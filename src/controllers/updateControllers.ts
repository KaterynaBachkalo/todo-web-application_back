import { Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import { Contact } from "../models";
import { HttpError } from "../utils";
import { CreationOptional } from "sequelize";

interface CustomRequest extends Request {
  user: {
    id: CreationOptional<number>;
    email: string;
    name: string;
  };
}

const addToContacts = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const myContact = await Contact.findByPk(id);

  if (!myContact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const contact = await Contact.create({
    name: myContact.name,
    phone: myContact.phone,
  });

  res.status(201).json(contact);
});

const deleteFromContacts = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    const deletedContact = await Contact.destroy({ where: { id: id } });

    if (!deletedContact) {
      throw new HttpError(404, "Contact not found");
    }

    res.status(200).json({
      message: "Your contact is successfully removed",
    });
  }
);

export default {
  addToContacts,
  deleteFromContacts,
};
