import express from "express";
import { customers } from "../controllers/cafe.controller";
import tryCatch from "../utils/tryCatch";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: "RS256",
});
const checkScopes = requiredScopes("read:messages");

const cafeRouter = express.Router();

// Fetch all customer data for a specific cafe
cafeRouter.get("/customers", checkJwt, tryCatch(customers));

export default cafeRouter;
