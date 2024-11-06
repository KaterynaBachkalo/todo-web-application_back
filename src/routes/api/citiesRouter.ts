import express from "express";
import { getControllers } from "../../controllers";

const router = express.Router();

router.route("/").get(getControllers.getCities);

router.route("/locations").get(getControllers.getCitiesLocations);

export default router;
