import { Request, Response } from "express";
import ServerError from "../utils/serverError";
import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import {
  CMAC_MISMATCH,
  COUNTER_BEHIND,
  INVALID_TAG_DATA,
  TAG_INACTIVE,
  TAG_INVALID,
  TAG_UNAUTHORISED,
  UID_MISMATCH,
} from "../models/errorCodes";
dotenv.config();

export const verifyTag = async (req: Request, res: Response, next: any) => {
  const { tagId, enc, cmac, eCode } = req.query;
  console.log(req.query);

  const etrnlKey = process.env.ETRNL_KEY;

  const options = {
    method: "POST",
    url: "https://third-party.etrnl.app/v1/tags/verify-authenticity",
    headers: { "API-Key": etrnlKey, "Content-Type": "application/json" },
    data: {
      tagId,
      enc,
      cmac,
      eCode,
    },
  };

  const response: AxiosResponse = await axios(options);
  const { data } = response;
  console.log(data);
  if (data.err) {
    switch (data.err) {
      case "ctrBehind":
        throw new ServerError(COUNTER_BEHIND, "Tag counter behind", 400);
      case "uidMismatch":
        throw new ServerError(
          UID_MISMATCH,
          "UID for tag did not match database",
          400,
        );
      case "cmacMismatch":
        throw new ServerError(
          CMAC_MISMATCH,
          "CMAC for tag did not match database",
          400,
        );
      case "doesNotExist":
        throw new ServerError(TAG_INVALID, "Tag ID does not exist", 400);
      case "inactive":
        throw new ServerError(TAG_INACTIVE, "Tag is no longer active", 400);
      case "unauthorized":
        throw new ServerError(
          TAG_UNAUTHORISED,
          "Tag is not part of coffee rewards web",
          400,
        );
      case "invalidData":
        throw new ServerError(INVALID_TAG_DATA, "Tag data invalid", 400);
    }
  }
};
