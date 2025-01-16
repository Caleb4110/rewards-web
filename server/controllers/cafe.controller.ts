import { Request, Response } from "express";

import db from "../models";
import { Op } from "sequelize";

import {
  DB_DATA_EMPTY,
  DB_INSERT_ERR,
  INVALID_PASSWORD,
  MISSING_KEY,
} from "../models/errorCodes";
import ServerError from "../utils/serverError";

require("dotenv").config();

const Cafes = db.cafes;
const Rewards = db.rewards;
const Users = db.users;

// Retrieve a cafe from email
// When a cafe is not found, return nothing
// TODO: Decide whether to find cafes based on id OR email. (depends on which will be stored on the cafes tag)
export const cafe = async (req: Request, res: Response) => {
  const { email } = req.query;

  const cafe = await Cafes.findOne({
    where: {
      email: email,
    },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });

  if (!cafe) {
    throw new ServerError(DB_DATA_EMPTY, "cafe not found", 400);
  }

  return res.status(200).send(cafe);
};

// Retrieve all customers associated with a cafe
export const customers = async (req: Request, res: Response) => {
  const { id } = req.query;

  // Fetch all customer rewards linked to a cafe
  const customers = await Rewards.findAll({
    where: {
      cafeId: id,
    },
    attributes: { include: ["userId", "rewardCount"] },
    raw: true,
  });

  const users = await Promise.all(
    customers.map(async function (reward: {
      userId: number;
      rewardCount: number;
    }) {
      const { userId, rewardCount } = reward;

      // Then fetch all users from the rewards
      // NOTE: No error handling for finding users,
      // because if there is a reward linked to a user, the user must exist
      const user = await Users.findOne({
        where: {
          id: userId,
          dob: {
            [Op.not]: null,
          },
        },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        raw: true,
      });

      // Create a new object containing the user and the reward count
      return {
        ...user,
        rewardCount,
      };
    }),
  );

  // NOTE: This is a 200 response since a cafe can indeed have no customers
  if (!users) {
    throw new ServerError(DB_DATA_EMPTY, "no users found", 200);
  }

  return res.status(200).send(users);
};
