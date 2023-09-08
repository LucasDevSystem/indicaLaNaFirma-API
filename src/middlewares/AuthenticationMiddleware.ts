import { NextFunction, Request, Response } from "express";
const { verifyToken } = require("../utils/userToken");

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const baseUrl = req.url.split("/")[1];
    // plublic routes
    if (baseUrl === "auth") {
      return next();
    }

    const authorizationHeader = req.headers?.authorization;

    if (!authorizationHeader) {
      return res.status(499).send("Token Required");
    }

    const tokenParts = authorizationHeader.split(" ");
    const token = tokenParts[1];

    // validate token
    const isTokenValid = !!verifyToken(token);

    if (!isTokenValid) {
      return res.status(498).send("Invalid Token");
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = auth;
