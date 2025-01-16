import { Request, Response } from "express";
import ServerError from "../utils/serverError";
import {
  DB_DATA_EMPTY,
  DB_INSERT_ERR,
  INVALID_TOKEN,
} from "../models/errorCodes";
import db from "../models";

require("dotenv").config();

const Rewards = db.rewards;
const Cafes = db.cafes;
const Users = db.users;

// TODO: Check if valid user and valid cafe
// Updates or creates the reward associated with userId and cafeId
export const updateReward = async (req: Request, res: Response) => {
  const { userId, cafeId } = req.body;

  const cafe = await Cafes.findOne({
    where: {
      id: cafeId,
    },
    attributes: { include: ["rewardFreq"] },
  });

  const user = await Users.findOne({
    where: {
      id: userId,
    },
  });

  if (!user || !cafe) {
    throw new ServerError(DB_DATA_EMPTY, "User or cafe do not exist", 400);
  }

  const reward = await Rewards.findOne({
    where: {
      userId: userId,
      cafeId: cafeId,
    },
  });

  // If a reward already exists ie. user is already a customer,
  // update the token count, visit count and reward count appropriately
  if (reward) {
    if (reward.tokenCount + 1 >= cafe.rewardFreq) {
      reward.validRewards += 1;
      reward.tokenCount = 0;
    } else {
      reward.tokenCount += 1;
    }

    reward.visitCount += 1;

    await reward.save();

    return res.status(201).send(reward);
  }

  const data = {
    userId,
    cafeId,
  };

  // Otherwise create a new reward ie. make the user a customer
  Rewards.create(data);
  if (!data) {
    throw new ServerError(DB_INSERT_ERR, "Error creating reward", 500);
  }

  return res.status(201).send(data);
};

export const useReward = async (req: Request, res: Response) => {
  const { id } = req.body;

  const reward = await Rewards.findOne({
    where: {
      id: id,
    },
  });

  // If a reward isn't found, then theres an error
  if (!reward) {
    throw new ServerError(DB_INSERT_ERR, "Reward not found", 400);
  }

  if (reward.validRewards - 1 < 0) {
    throw new ServerError(DB_INSERT_ERR, "Reward invalid", 400);
  }

  reward.validRewards -= 1;
  reward.usedRewards += 1;
  reward.visitCount += 1;

  await reward.save();

  return res.status(200).send(reward);
};
