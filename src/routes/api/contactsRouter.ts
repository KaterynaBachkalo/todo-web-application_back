import express from "express";

import { updateControllers, getControllers } from "../../controllers";
import { authMiddlewares, updateMiddlewares } from "../../middlewares";

const router = express.Router();

router.use(authMiddlewares.protect);

router.route("/").get(getControllers.getContacts);

router
  .route("/add")
  .post(updateMiddlewares.checkNumber, updateControllers.addContacts);

router.route("/remove/:id").delete(updateControllers.deleteContacts);

export default router;
