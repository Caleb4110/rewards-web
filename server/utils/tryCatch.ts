import { Request, Response } from "express";

const tryCatch =
  (controller: any) => async (req: Request, res: Response, next: any) => {
    try {
      await controller(req, res);
      next();
    } catch (err) {
      next(err);
    }
  };

export default tryCatch;
