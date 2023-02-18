import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const { cryptoPass, decryptPass } = require("../utils/cripytoHash");
const { generateToken } = require("../utils/userToken");

const prisma = new PrismaClient();

const register = async (req: Request, res: Response) => {
  try {
    const user: Prisma.UserCreateInput = req.body;
    const defaultProfile = {
      bio: "",
      profile_title: "",
    };

    const existing = await prisma.user.findUnique({
      where: { email: user?.email },
    });

    if (existing) {
      return res.status(403).send("user already exists");
    }
    // hash password
    const encryptedPassword = cryptoPass(user.password);

    // create user and default profile
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone_number: user?.phone_number,
        ra: user?.ra,
        password: encryptedPassword,
        profile: { create: defaultProfile },
      },
    });

    return res.json({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user: Prisma.UserCreateInput = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email: user?.email },
    });

    if (!existingUser) {
      return res.status(404).send("user not found");
    }
    // decrypt hased password
    const decryptedPassword = decryptPass(existingUser.password);

    // validate password
    if (decryptedPassword !== user.password) {
      return res.status(401).send("invalid password");
    }
    // only nescessary data
    const responseUserData = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
    // generate JWT
    const token = generateToken(responseUserData);
    // store jwt in user cookie
    res.cookie("authorization", token, { httpOnly: true, secure: true });

    return res.json(responseUserData);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = { register, login };
