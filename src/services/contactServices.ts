import { DataTypes, Op } from "sequelize";
import { Contact } from "../models";
import { IContact, QueryParams } from "../types";

// PAGINATION FEATURE =============================
const pagination = (query: QueryParams) => {
  const limit = 10;

  const page = query.page ? +query.page : 1;
  const limmit = query.limit ? +query.limit : limit;
  const offset = (page - 1) * limmit;

  return { limit, offset, page };
};

const getContacts = async (query: QueryParams) => {
  // SEARCH FEATURE =====================================

  const findOptions: Record<string, unknown> = {};

  // Фільтрація по name
  if (typeof query.name === "string" && query.name.trim() !== "") {
    findOptions.name = new RegExp(query.name, "i");
  }

  // INIT DB QUERY ================================

  const { limit, offset, page } = pagination(query);

  const { count, rows } = await Contact.findAndCountAll({
    where: {
      name: {
        [Op.like]: `%${query.name || ""}%`,
      },
    },
    offset,
    limit,
  });

  const contacts = rows;

  return {
    contacts,
    totalContacts: count,
    page,
    limit,
  };
};

const addContact = async (userId: string, contactData: IContact) => {
  const newContact = await Contact.create({ user_id: userId, ...contactData });

  return newContact;
};

export default {
  getContacts,
  addContact,
};
