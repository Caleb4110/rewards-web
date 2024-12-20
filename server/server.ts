import { Request, Response } from "express";

import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import cors from "cors";
import db from "./models";

import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import errorHandler from "./middleware/errorHandler";
import cafeRoutes from "./routes/cafe.routes";
import userRoutes from "./routes/user.routes";
import rewardRoutes from "./routes/reward.routes";
import dbRoutes from "./routes/db.routes";

const port = process.env.PORT || 5000;

export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: "RS256",
});

const checkScopes = requiredScopes("read:messages");

// enforce on all endpoints
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/cafes", cafeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/db", dbRoutes);

app.use(errorHandler);

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false, logging: false }).then(() => {
  console.log("db has been re-synced");
});

app.listen(port, () => {
  console.log("Running on port: ", port);
});
