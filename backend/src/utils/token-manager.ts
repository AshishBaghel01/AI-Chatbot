import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
  const options: SignOptions = { expiresIn: expiresIn as any };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  
  const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
  
  return new Promise<void>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, success) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Token Expired or Invalid" });
      } else {
        res.locals.jwtData = success;
        resolve();
        return next();
      }
    });
  });
};
