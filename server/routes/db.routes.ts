import { addToDb } from "../controllers/db.controller";
import tryCatch from "../utils/tryCatch";
import express from "express";

const dbRouter = express.Router();
dbRouter.post("/add", tryCatch(addToDb));

export default dbRouter;
