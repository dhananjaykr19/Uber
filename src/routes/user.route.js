import { Router } from "express";
import { loginUser, registerUser, logoutUser, getProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/profile").post(verifyJWT, getProfile);
export default router;