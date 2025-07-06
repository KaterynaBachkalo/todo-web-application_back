import express from "express";
import { authMiddlewares } from "../../middlewares";
import { authControllers, getAuthControllers, google } from "../../controllers";

const router = express.Router();

router.get("/google", google.googleAuth);

router.get("/google-redirect", google.googleRedirect);

router
  .route("/register")
  .post(authMiddlewares.checkRegistrationData, authControllers.registration);

router
  .route("/login")
  .post(authMiddlewares.checkLoginData, authControllers.login);

router.use(authMiddlewares.protect);

router.route("/current").get(getAuthControllers.getCurrentUserInfo);

router.route("/logout").post(authControllers.logout);

export default router;
