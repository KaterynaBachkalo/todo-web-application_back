import express from "express";
import { authMiddlewares } from "../../middlewares";
import {
  authControllers,
  getAuthControllers,
  updateAuthControllers,
} from "../../controllers";

const router = express.Router();

router
  .route("/register")
  .post(authMiddlewares.checkRegistrationData, authControllers.registration);

router
  .route("/login")
  .post(authMiddlewares.checkLoginData, authControllers.login);

router.post("/refresh-token", authControllers.refreshToken);

router.use(authMiddlewares.protect);

router.route("current").get(getAuthControllers.getCurrentUserInfo);

router.route("current/full").get(getAuthControllers.getCurrentUserFullInfo);

router
  .route("current/edit")
  .patch(
    authMiddlewares.checkCurrentUser,
    updateAuthControllers.updateCurrentUser
  );

router
  .route("current/pets/add")
  .post(authMiddlewares.checkPetData, updateAuthControllers.addPet);

router
  .route("current/pets/remove/:id")
  .delete(updateAuthControllers.deletePetById);

router.route("logout").post(authControllers.logout);

export default router;
