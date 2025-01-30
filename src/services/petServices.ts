import { Favorite, Friend, News, Notice } from "../models";
import { QueryParams } from "../types";
import { HttpError } from "../utils";

// PAGINATION FEATURE =============================
const pagination = (dbQuery: any, query: QueryParams) => {
  const limit = 6;

  const paginationPage = query.page ? +query.page : 1;
  const paginationLimit = query.limit ? +query.limit : limit;
  const docsToSkip = (paginationPage - 1) * paginationLimit;

  dbQuery.skip(docsToSkip).limit(paginationLimit);

  return { page: paginationPage, limit: paginationLimit };
};

const getNews = async (query: QueryParams) => {
  // SEARCH FEATURE =====================================
  const findOptions =
    typeof query.title === "string" && query.title.trim() !== ""
      ? {
          title: new RegExp(query.title, "i"), // Case-insensitive partial search
        }
      : {};

  // INIT DB QUERY ================================
  const newsQuery = News.find(findOptions);

  const { page, limit } = pagination(newsQuery, query);

  const news = await newsQuery;

  const totalNews = await News.countDocuments(findOptions);

  return {
    news,
    totalNews,
    page,
    limit,
  };
};

const getFriends = async () => {
  // INIT DB QUERY ================================
  const friendsQuery = Friend.find();

  const friends = await friendsQuery;

  return {
    friends,
  };
};

const getNotices = async (query: QueryParams) => {
  // SEARCH FEATURE =====================================

  const findOptions: Record<string, unknown> = {};

  // Фільтрація по title
  if (typeof query.title === "string" && query.title.trim() !== "") {
    findOptions.title = new RegExp(query.title, "i");
  }

  // Фільтрація по category
  if (typeof query.category === "string" && query.category.trim() !== "") {
    findOptions.category = query.category;
  }

  // Фільтрація по sex
  if (typeof query.sex === "string" && query.sex.trim() !== "") {
    findOptions.sex = query.sex;
  }

  // Фільтрація по species
  if (typeof query.species === "string" && query.species.trim() !== "") {
    findOptions.species = query.species;
  }

  // INIT DB QUERY ================================

  let noticeQuery = Notice.find(findOptions);

  // Сортування
  if (query.sort === "popular" || query.sort === "unpopular") {
    const sortOrder = query.sort === "popular" ? -1 : 1;
    noticeQuery = noticeQuery.sort({ popularity: sortOrder });
  } else if (query.sort === "cheap" || query.sort === "expensive") {
    const sortOrder = query.sort === "expensive" ? -1 : 1;
    noticeQuery = noticeQuery.sort({ price: sortOrder });
  }

  const { page, limit } = pagination(noticeQuery, query);

  const notices = await noticeQuery;

  const totalNotices = await Notice.countDocuments(findOptions);

  return {
    notices,
    totalNotices,
    page,
    limit,
  };
};

export default {
  getNews,
  getFriends,
  getNotices,
};
