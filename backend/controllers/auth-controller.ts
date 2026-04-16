import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { selectUserByEmail } from "../models/users-models";
import { selectUserById } from "../models/users-models";
import { sanitizeUser } from "../utils/databaseHelpers";
import { User } from "../types";
import { JwtPayload } from "../types";
import { logAudit } from "../utils/logAudit";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ msg: "Email and password are required" });
    }

    const user = await selectUserByEmail(email as string);
    if (!user) {
      return res.status(401).send({ msg: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).send({ msg: "Invalid email or password" });
    }

    const secret = process.env.JWT_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!secret || !refreshSecret) {
      return res.status(500).send({ msg: "Server configuration error" });
    }

    const payload: JwtPayload = {
      userId: user.id as number,
      username: user.username,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "30d" });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
    });

    const sanitizedUser = sanitizeUser(user as User);
    await logAudit({
      userId: user.id as number,
      action: "login",
      resourceType: "user",
      resourceId: user.id as number,
      method: req.method,
      route: req.originalUrl,
      statusCode: 200,
      metadata: { username: user.username, email: user.email },
      ip: req.ip as string,
    });
    res.status(200).json({ user: sanitizedUser, token });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenFromCookie = req.cookies?.refreshToken;
    if (!tokenFromCookie) {
      return res.status(401).send({ msg: "Refresh token required" });
    }

    const secret = process.env.JWT_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!secret || !refreshSecret) {
      return res.status(500).send({ msg: "Server configuration error" });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(tokenFromCookie, refreshSecret) as JwtPayload;
    } catch {
      return res.status(401).send({ msg: "Invalid or expired refresh token" });
    }

    const user = await selectUserById(decoded.userId);
    if (!user) {
      return res.status(401).send({ msg: "User not found" });
    }

    const payload: JwtPayload = {
      userId: user.id as number,
      username: user.username,
    };

    const newAccessToken = jwt.sign(payload, secret, { expiresIn: "7d" });
    const newRefreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: "30d",
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
    });

    return res.status(200).json({ token: newAccessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
    });
    res.status(200).json({ msg: "Logged out" });
  } catch (err) {
    next(err);
  }
};
