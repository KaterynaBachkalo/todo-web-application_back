import { Contact } from "../models";
import { QueryParams } from "../types";

// PAGINATION FEATURE =============================
const pagination = (dbQuery: any, query: QueryParams) => {
  const limit = 6;

  const paginationPage = query.page ? +query.page : 1;
  const paginationLimit = query.limit ? +query.limit : limit;
  const docsToSkip = (paginationPage - 1) * paginationLimit;

  dbQuery.skip(docsToSkip).limit(paginationLimit);

  return { page: paginationPage, limit: paginationLimit };
};

const getContacts = async (query: QueryParams) => {
  // SEARCH FEATURE =====================================

  const findOptions: Record<string, unknown> = {};

  // Фільтрація по name
  if (typeof query.name === "string" && query.name.trim() !== "") {
    findOptions.name = new RegExp(query.name, "i");
  }

  // INIT DB QUERY ================================

  let contactQuery = await Contact.findAll(findOptions);

  const { page, limit } = pagination(contactQuery, query);

  const contacts = await contactQuery;

  const totalContacts = await Contact.count(findOptions);

  return {
    contacts,
    totalContacts,
    page,
    limit,
  };
};

// const addContact = async (userId: string, contactData: IPet) => {
//   const newContact = await addContact.create({ owner: userId, ...contactData });

//   return newContact;
// };

export default {
  getContacts,
  //   addContact,
};
