import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData: Prisma.UserUpdateInput = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: userData,
    });

    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const del = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.user.delete({ where: { id: parseInt(id) } });

    return res.json(deleted);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = { get, update, del };
