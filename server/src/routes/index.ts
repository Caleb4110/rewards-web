import express from "express";
const router = express.Router();

import cafeRoutes from "./cafe.routes";
import userRoutes from "./user.routes";
import rewardRoutes from "./reward.routes";
import dbRoutes from "./db.routes";

router.use("/api/cafes", cafeRoutes);
router.use("/api/users", userRoutes);
router.use("/api/rewards", rewardRoutes);
router.use("/api/db", dbRoutes);

export default router;
