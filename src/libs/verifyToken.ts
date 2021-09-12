import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface Ipayload {
  _id: string;
  iad: number;
  exp: number;
}

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("Access denied");
  const payload = jwt.verify(
    token,
    process.env.SECRETKEY || "TOKENTESt"
  ) as Ipayload;
  req.userId = payload._id;
  next();
};
