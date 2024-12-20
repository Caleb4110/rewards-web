import { Request, Response } from "express";
import ServerError from "../utils/serverError";
import { DB_INSERT_ERR, INVALID_TOKEN } from "../models/errorCodes";
import { Auth0User } from "../models/auth0UserModel";
import db from "../models";

require("dotenv").config();

const Cafes = db.cafes;
const Users = db.users;

export const addToDb = async (req: Request, res: Response) => {
  const { user, role, secret } = req.body;

  console.log(user, role);

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    throw new ServerError(INVALID_TOKEN, "Invalid hook secret", 401);
  }
  const usr = user as Auth0User;

  // If the user is a regular user, add to the user table
  // NOTE:
  // Date of birth and location are added when a user reaches their first reward
  if (role === "user" && usr.phone_number) {
    await Users.create({
      id: usr.user_id,
      phoneNumber: usr.phone_number,
      dob: usr.user_metadata.dob,
      suburb: usr.user_metadata.suburb,
    });
    return res.status(201).send("User created");
  }

  // If the user is a cafe, add to the cafe table
  // TODO: Add email to cafe form in AUTH0
  else if (role === "cafe" && usr.phone_number && usr.user_metadata.cafe_name) {
    await Cafes.create({
      id: usr.user_id,
      phoneNumber: usr.phone_number,
      name: usr.user_metadata.cafe_name,
      rewardFreq: usr.user_metadata.reward_freq,
      // NOTE: unrequired for demo
      // paid_at: usr.paid_at
    });
    return res.status(201).send("Cafe created");
  }

  throw new ServerError(DB_INSERT_ERR, "Could not create a new user/cafe", 400);
};
