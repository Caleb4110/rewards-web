import { Request, Response } from "express";

import db from "../models";
import { Op } from "sequelize";

import {
  DB_DATA_EMPTY,
  DB_INSERT_ERR,
  INVALID_PASSWORD,
  MISSING_KEY,
  MISSING_PARAMETER,
} from "../models/errorCodes";
import ServerError from "../utils/serverError";

require("dotenv").config();

const Cafes = db.cafes;
const Rewards = db.rewards;
const Users = db.users;

// When a cafe signs in for the first time, add their email to the app database
export const addCafe = async (req: Request, res: Response) => {
  const { email, secret } = req.body;

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    throw new ServerError(MISSING_KEY, "Missing or invalid key", 403);
  }

  if (email) {
    await Users.create({
      email: email,
    });
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    throw new ServerError(MISSING_PARAMETER, "Missing user id", 401);
  }

  const user = await Users.findOne({
    where: {
      id: id,
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  if (!user) {
    throw new ServerError(DB_DATA_EMPTY, "User not found", 400);
  }

  return res.status(200).send(user);
};
