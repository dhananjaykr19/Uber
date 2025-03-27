import { Router } from "express";
import { loginCaptain, registerCaptain } from "../controllers/captain.controller.js";
const router  = Router();

router.route('/register').post(registerCaptain)
router.route('/login').post(loginCaptain)
export default router;