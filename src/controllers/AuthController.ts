import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const { cryptoPass, decryptPass } = require("../utils/cripytoHash");

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
      return res.status(400).send("user already exists");
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
      return res.status(400).send("user not found");
    }
    // decrypt hased password
    const decryptedPassword = decryptPass(existingUser.password);
    // validate password
    if (decryptedPassword !== user.password) {
      return res.status(400).send("invalid password");
    }

    return res.json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = { register, login };
