import express from "express";
import tryCatch from "../utils/tryCatch";
import { auth } from "express-oauth2-jwt-bearer";
import { updateReward, useReward } from "../controllers/reward.controller";

export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: "RS256",
});

const rewardRouter = express.Router();

rewardRouter.post("/update", checkJwt, tryCatch(updateReward));

rewardRouter.post("/use", checkJwt, tryCatch(useReward));

export default rewardRouter;
