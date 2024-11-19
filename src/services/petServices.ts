import { Friend, News, Notice } from "../models";
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

  const findOptions =
    typeof query.title === "string" && query.title.trim() !== ""
      ? {
          title: new RegExp(query.title, "i"),
        }
      : {};

  // INIT DB QUERY ================================

  console.log(findOptions);
  const noticeQuery = Notice.find(findOptions);

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
