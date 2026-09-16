import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import { getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/perfil", authMiddleware, getProfile);

export default router;