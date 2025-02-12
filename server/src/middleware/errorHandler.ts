import { Request, Response } from "express";
import ServerError from "../utils/serverError";

const errorHandler = (err: Error, req: Request, res: Response, next: any) => {
  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({
      errorCode: err.errorCode,
      message: err.message,
    });
  }
  return res.status(400).send(err.message);
};

export default errorHandler;
