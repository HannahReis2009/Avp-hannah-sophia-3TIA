import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

import { getProfile, getAdmin } from "../controllers/userController.js";

const router = express.Router();

router.get("/perfil", authMiddleware, getProfile);

router.get("/admin", authMiddleware, adminMiddleware, getAdmin);

export default router;