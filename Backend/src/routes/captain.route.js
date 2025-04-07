import { Router } from "express";
import { loginCaptain, logoutCaptain, registerCaptain, getCaptainProfile } from "../controllers/captain.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router  = Router();

router.route('/register').post(registerCaptain)
router.route('/login').post(loginCaptain)
router.route('/profile').get(verifyJWT, getCaptainProfile)
router.route('/logout').post(verifyJWT, logoutCaptain)
export default router;