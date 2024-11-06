import express from "express";
import { getControllers } from "../../controllers";

const router = express.Router();

router.route("/").get(getControllers.getNews);

export default router;
