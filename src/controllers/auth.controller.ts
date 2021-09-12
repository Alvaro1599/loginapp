import { Response, Request } from "express";
import User, { Iuser } from "../models/User";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  //saving a new user
  const user: Iuser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  user.password = await user.encryptPassword(user.password);
  const saveUser = await user.save();
  //token
  const token: string = jwt.sign(
    { _id: saveUser._id },
    process.env.SECRETKEY || "TOKENTESt"
  );
  res.header("auth-token", token).send(saveUser);
};
export const signin = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("password or email is wrong");
  const correctPassword: boolean = await user.validatePassword(
    req.body.password
  );
  if (!correctPassword)
    return res.status(400).json("Credentials are incorrect");
  const token: string = jwt.sign(
    { _id: user.id },
    process.env.SECRETKEY || "TOKENTESt",
    {
      expiresIn: 60 * 60 * 24,
    }
  );
  res.header("auth-token", token).json(user);
  console.log(req.body);
};
export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json("No UserFound");
  res.json(user);
};
