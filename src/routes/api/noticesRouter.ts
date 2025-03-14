import express from "express";

import { updateControllers, getControllers } from "../../controllers";
import { authMiddlewares, updateMiddlewares } from "../../middlewares";

const router = express.Router();

router.route("/").get(getControllers.getNotices);

router
  .route("/add/:id")
  .post(updateMiddlewares.checkNoticesId, updateControllers.addToNotices);

router.use(authMiddlewares.protect);

router
  .route("/favorites/add/:id")
  .post(updateMiddlewares.checkFavoritesId, updateControllers.addFavorites);

router
  .route("/viewed/add/:id")
  .post(updateMiddlewares.checkViewedId, updateControllers.addViewed);

router.route("/favorites/remove/:id").delete(updateControllers.deleteFavorites);

export default router;
