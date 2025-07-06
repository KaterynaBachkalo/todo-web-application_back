import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { contactServices } from "../services";

const getContacts = catchAsync(async (req: Request, res: Response) => {
  const { contacts, totalContacts, page, limit } =
    await contactServices.getContacts(req.query);
  res.status(200).json({
    contacts,
    totalContacts,
    page,
    limit,
  });
});

export default {
  getContacts,
};
