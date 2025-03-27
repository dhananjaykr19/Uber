import { Router } from "express";
import { registerCaptain } from "../controllers/captain.controller.js";
const router  = Router();

router.route('/register').post(registerCaptain)

export default router;