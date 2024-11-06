import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const getNotices = catchAsync(async (req: Request, res: Response) => {});

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

const getFriends = catchAsync(async (req: Request, res: Response) => {});

const getNews = catchAsync(async (req: Request, res: Response) => {});

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
