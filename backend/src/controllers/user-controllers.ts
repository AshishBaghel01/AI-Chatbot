import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    
    console.log("=== SIGNUP DEBUG START ===");
    console.log("Request body:", JSON.stringify(req.body));
    console.log("Name:", name, "Type:", typeof name);
    console.log("Email:", email, "Type:", typeof email);
    console.log("Password:", password ? "provided" : "undefined", "Type:", typeof password);
    
    if (!name || !email || !password) {
      console.log("Missing required fields - Name:", !!name, "Email:", !!email, "Password:", !!password);
      return res.status(400).json({ message: "ERROR", cause: "Missing required fields: name, email, or password" });
    }
    
    if (typeof password !== 'string' || password.length < 6) {
      console.log("Password validation failed");
      return res.status(400).json({ message: "ERROR", cause: "Password must be at least 6 characters" });
    }
    
    console.log("Checking for existing user...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(409).send("User already registered");
    }
    
    console.log("No existing user, proceeding with hash...");
    console.log("Password to hash, length:", password.length);
    
    let hashedPassword: string;
    try {
      const passwordStr = String(password);
      hashedPassword = await hash(passwordStr, 10);
      console.log("Password hashed successfully, length:", hashedPassword.length);
    } catch (hashError) {
      console.error("Bcrypt hash error:", hashError);
      console.error("Error name:", hashError instanceof Error ? hashError.name : "unknown");
      console.error("Error message:", hashError instanceof Error ? hashError.message : "unknown");
      return res.status(500).json({ message: "ERROR", cause: "Failed to hash password: " + (hashError instanceof Error ? hashError.message : "Unknown error") });
    }
    
    console.log("Creating new User document...");
    const user = new User({ name, email, password: hashedPassword });
    
    try {
      await user.save();
      console.log("User saved successfully, ID:", user._id);
    } catch (saveError) {
      console.error("User save error:", saveError);
      return res.status(500).json({ message: "ERROR", cause: "Failed to save user: " + (saveError instanceof Error ? saveError.message : "Unknown error") });
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      expires,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    console.log("Signup successful for:", email);
    console.log("=== SIGNUP DEBUG END ===");
    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error("Signup unexpected error:", error);
    console.log("=== SIGNUP DEBUG END WITH ERROR ===");
    return res.status(500).json({ 
      message: "ERROR", 
      cause: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      expires,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

