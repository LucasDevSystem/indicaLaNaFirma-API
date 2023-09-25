import { promisify } from "util";
const bcrypt = require("bcrypt");
// callback functions to promisse
const hashPass = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

const SECRET = process.env.ENCRYPTION_SECRET;
const SALT_ROUNDS = 10;

const cryptoPass = async (password: string): Promise<string> => {
  const hash = await hashPass(password, SALT_ROUNDS);

  return hash;
};

const checkPass = async (password: string, hash: string): Promise<boolean> => {
  const result = await compare(password, hash);

  return result;
};

module.exports = { cryptoPass, checkPass };
