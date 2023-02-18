import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const create = async (req: Request, res: Response) => {
  try {
    const application: Prisma.ApplicationCreateInput = req.body;
    const createdApplication= await prisma.application.create({
      data: application,
    });

    return res.json(createdApplication);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};


// get all  user applications
const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const applications = await prisma.application.findMany({ where: { userId: parseInt(id) } });

    return res.json(applications);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application: Prisma.JobUpdateInput = req.body;

    const updatedApplication = await prisma.job.update({
      where: { id: parseInt(id) },
      data: application,
    });

    return res.json(updatedApplication);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const del = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.application.delete({ where: { id: parseInt(id) } });

    return res.json(deleted);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = { create, get, update, del};