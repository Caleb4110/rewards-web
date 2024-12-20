import { Request, Response } from "express";
import ServerError from "../utils/serverError";
import { DB_INSERT_ERR, INVALID_TOKEN } from "../models/errorCodes";
import db from "../models";

require("dotenv").config();

const Rewards = db.rewards;

// Updates or creates the reward associated with userId and cafeId
export const update = async (req: Request, res: Response) => {
  const { userId, cafeId } = req.body;

  const reward = await Rewards.findOne({
    where: {
      userId: userId,
      cafeId: cafeId,
    },
  });

  // If a reward already exists ie. user is already a customer,
  // update the reward count
  if (reward) {
    reward.rewardCount += 1;
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
