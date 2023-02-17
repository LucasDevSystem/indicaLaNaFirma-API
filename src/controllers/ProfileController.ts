import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const create = async (req: Request, res: Response) => {
  try {
    const profile: Prisma.ProfileCreateInput = req.body;
    const createdProfile = await prisma.profile.create({ data: profile });

    return res.json(createdProfile);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const {id }= req.params;
    const profile = await prisma.profile.findUnique({ where: { id: parseInt(id) } });

    return res.json(profile);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profileData: Prisma.ProfileUpdateInput = req.body;

    const updatedProfile = await prisma.profile.update({
      where: { id: parseInt(id) },
      data: profileData,
    });

    return res.json(updatedProfile);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};


module.exports = { create , get , update};
