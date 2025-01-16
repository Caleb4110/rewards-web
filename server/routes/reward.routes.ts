import express from "express";
import tryCatch from "../utils/tryCatch";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { updateReward, useReward } from "../controllers/reward.controller";

export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: "RS256",
});
const checkScopes = requiredScopes("read:messages");

const rewardRouter = express.Router();

rewardRouter.get("/get", () => console.log("getting"));

// TODO: Add checkJwt here
rewardRouter.post("/update", tryCatch(updateReward));

rewardRouter.post("/use", tryCatch(useReward));

export default rewardRouter;
