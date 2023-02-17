import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const create = async (req: Request, res: Response) => {
  try {
    const job: Prisma.JobCreateInput = req.body;
    const createdJob = await prisma.job.create({
      data: job,
    });

    return res.json(createdJob);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
// get all avaliable jobs
const getAll = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({});

    return res.json(jobs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
// get one job by id
const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.job.findUnique({ where: { id: parseInt(id) } });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobData: Prisma.JobUpdateInput = req.body;

    const updatedJob = await prisma.job.update({
      where: { id: parseInt(id) },
      data: jobData,
    });

    return res.json(updatedJob);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const del = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.job.delete({ where: { id: parseInt(id) } });

    return res.json(deleted);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = { create, get, update, del, getAll };
