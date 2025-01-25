import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    res.json({ success: true, data: req.user });
  })
);

export default router;
