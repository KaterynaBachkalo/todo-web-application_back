import express from "express";

import { updateControllers, getControllers } from "../../controllers";
import { authMiddlewares, updateMiddlewares } from "../../middlewares";

const router = express.Router();

router.route("/").get(getControllers.getNotices);

router.route("/categories").get(getControllers.getNoticeCategories);

router.route("/sex").get(getControllers.getNoticeSex);

router.route("/species").get(getControllers.getNoticeSpecies);

router.use(authMiddlewares.protect);

router
  .route("/favorites/add/:id")
  .post(updateMiddlewares.checkFavoritesId, updateControllers.addFavorites);

router.route("/favorites/remove/:id").delete(updateControllers.deleteFavorites);

router.route("/:id").get(getControllers.getNoticesById);

export default router;
