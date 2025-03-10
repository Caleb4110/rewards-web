import { Request, Response } from "express";

import { Op } from "sequelize";

import db from "../models";
const { Cafe, Reward, User } = db;
import { DB_DATA_EMPTY } from "../models/errorCodes";
import ServerError from "../utils/serverError";

require("dotenv").config();

// Retrieve a cafe from email
// When a cafe is not found, return nothing
// TODO: Decide whether to find cafes based on id OR email. (depends on which will be stored on the cafes tag)
export const cafe = async (req: Request, res: Response) => {
  const { email } = req.query;

  const cafe = await Cafe.findOne({
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
  const rewards = await Reward.findAll({
    where: {
      cafeId: id,
    },
    attributes: { include: ["userId", "tokenCount", "validRewards"] },
    raw: true,
  });

  const users = await Promise.all(
    rewards.map(async function (reward) {
      const { userId, tokenCount, validRewards, visitCount } = reward;

      // Then fetch all users from the rewards
      // NOTE: No error handling for finding users,
      // because if there is a reward linked to a user, the user must exist
      const user = await User.findOne({
        where: {
          id: userId,
          dob: {
            [Op.not]: null,
          },
        },
        attributes: { exclude: ["password", "createdAt", "updatedAt", "id"] },
        raw: true,
      });

      // Create a new object containing the user and the reward count
      return {
        ...user,
        validRewards,
        visitCount,
        tokenCount,
      };
    }),
  );

  // NOTE: This is a 200 response since a cafe can indeed have no customers
  if (!users) {
    throw new ServerError(DB_DATA_EMPTY, "no users found", 200);
  }

  return res.status(200).send(users);
};
