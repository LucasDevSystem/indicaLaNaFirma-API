import { NextFunction, Request, Response } from "express";
const { verifyToken } = require("../utils/userToken");

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const baseUrl = req.url.split("/")[1];
    // plublic routes
    if (baseUrl === "auth") {
      return next();
    }

    const { cookie = "" } = req.headers;
    const cookieObj: any = cookieParser(cookie);

    if (!cookieObj.authorization) {
      return res.status(499).send("Token Required");
    }
    // validate token
    const isTokenValid = !!verifyToken(cookieObj.authorization);

    if (!isTokenValid) {
      return res.status(498).send("Invalid Token");
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const cookieParser = (cookie: string) => {
  const values = cookie.split(";").reduce((res, item) => {
    const data = item.trim().split("=");
    return { ...res, [data[0]]: data[1] };
  }, {});
  return values;
};

module.exports = auth;
