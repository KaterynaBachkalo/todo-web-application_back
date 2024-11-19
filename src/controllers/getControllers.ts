import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { petServices } from "../services";

const getNotices = catchAsync(async (req: Request, res: Response) => {
  const { notices, totalNotices, page, limit } = await petServices.getNotices(
    req.query
  );

  res.status(200).json({
    notices,
    totalNotices,
    page,
    limit,
  });
});

const getNoticeCategories = catchAsync(
  async (req: Request, res: Response) => {}
);

const getNoticeSex = catchAsync(async (req: Request, res: Response) => {});

const getNoticeSpecies = catchAsync(async (req: Request, res: Response) => {});

const getNoticesById = catchAsync(async (req: Request, res: Response) => {});

const getCities = catchAsync(async (req: Request, res: Response) => {});

const getCitiesLocations = catchAsync(
  async (req: Request, res: Response) => {}
);

const getFriends = catchAsync(async (req: Request, res: Response) => {
  const { friends } = await petServices.getFriends();

  res.status(200).json({
    friends,
  });
});

const getNews = catchAsync(async (req: Request, res: Response) => {
  const { news, totalNews, page, limit } = await petServices.getNews(req.query);

  res.status(200).json({
    news,
    totalNews,
    page,
    limit,
  });
});

export default {
  getNotices,
  getNoticeCategories,
  getNoticeSex,
  getNoticeSpecies,
  getNoticesById,
  getCities,
  getCitiesLocations,
  getFriends,
  getNews,
};
