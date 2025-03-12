import express from "express";
import tryCatch from "../utils/tryCatch";
import { auth } from "express-oauth2-jwt-bearer";
import {
  getUser,
  getUserRewards,
  getUserTokens,
} from "../controllers/user.controller";
import { verifyTag } from "../middleware/verifyTag";
import { updateReward } from "../controllers/reward.controller";

export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: "RS256",
});

const userRouter = express.Router();

// TODO: add checkJwt here
userRouter.get("/get", checkJwt, tryCatch(getUser));

userRouter.get("/rewards", checkJwt, tryCatch(getUserRewards));

userRouter.get(
  "/scan",
  checkJwt, // 1) Check if the refresh token is valid
  /*tryCatch(verifyTag),*/ // 2) Verify the tag scan was valid
  tryCatch(updateReward), // 3) Update the reward entry
  tryCatch(getUserTokens), // 4) Compile the cafe info and token info into one object and return it
);

export default userRouter;
