import express from "express";
import tryCatch from "../utils/tryCatch";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { getUser } from "../controllers/user.controller";

export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: "RS256",
});
const checkScopes = requiredScopes("read:messages");

const userRouter = express.Router();

// TODO: add checkJwt here
userRouter.get("/get", tryCatch(getUser));

export default userRouter;
