import { Request, Response } from "express";

export type ContextType = {
  req: Request & { session: Express.Session };
  res: Response;
};
