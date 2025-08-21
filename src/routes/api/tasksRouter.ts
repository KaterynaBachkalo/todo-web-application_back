import express from "express";

import { updateControllers, getControllers } from "../../controllers";

const router = express.Router();

router.route("/").get(getControllers.getTasks);

router.route("/add").post(updateControllers.addTasks);

router.route("/remove/:id").delete(updateControllers.deleteTasks);

export default router;
