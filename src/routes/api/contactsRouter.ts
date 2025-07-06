import express from "express";

import { updateControllers, getControllers } from "../../controllers";
import { authMiddlewares, updateMiddlewares } from "../../middlewares";

const router = express.Router();

router.use(authMiddlewares.protect);

router.route("/").get(getControllers.getContacts);

router
  .route("/add/:id")
  .post(updateMiddlewares.checkContactId, updateControllers.addToContacts);

router.route("/remove/:id").delete(updateControllers.deleteFromContacts);

export default router;
