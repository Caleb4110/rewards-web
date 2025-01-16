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

/**
 * Fetches all information associated with a user
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object, used to send the result back to the client.
 * @returns A JSON response with the user info.
 */
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

/**
 * Fetches all rewards available for a user
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object, used to send the result back to the client.
 * @returns A JSON response with the reward count, cafe id and cafe name.
 */
export const getUserRewards = async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    throw new ServerError(MISSING_PARAMETER, "Missing user id", 401);
  }

  const rewardsPerCafe = await Rewards.findAll({
    where: {
      userId: id,
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  if (!rewardsPerCafe) {
    throw new ServerError(DB_DATA_EMPTY, "No rewards for selected user", 400);
  }

  const data = await Promise.all(
    rewardsPerCafe.map(async function (reward: any) {
      const { id, cafeId, validRewards, usedRewards } = reward;

      // Then fetch all cafe names from the rewards
      // NOTE: No error handling for finding users,
      // because if there is a reward linked to a user, the user must exist
      const cafe = await Cafes.findOne({
        where: {
          id: cafeId,
        },
        attributes: { include: ["name"] },
        raw: true,
      });

      const cafeName = cafe.name;

      // Create a new object containing the user and the reward count
      return {
        id,
        validRewards,
        usedRewards,
        cafeId,
        cafeName,
      };
    }),
  );

  const rewards = data.flatMap(function (cafe: any) {
    const { id, validRewards, usedRewards, cafeId, cafeName } = cafe;

    const valid = Array.from({ length: validRewards }, () => ({
      id,
      cafeId,
      cafeName,
      isValid: true,
    }));
    const used = Array.from({ length: usedRewards }, () => ({
      id,
      cafeId,
      cafeName,
      isValid: false,
    }));

    return valid.concat(used);
  });

  return res.status(200).send(rewards);
};
