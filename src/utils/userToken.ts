const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

interface TokenPayload {
  id: number;
  name: string;
  email: string;
}

const generateToken = (user: TokenPayload): string => {
  const token = jwt.sign(user, SECRET_KEY, { algorithm: "HS256" });

  return token;
};

const verifyToken = (token: string): TokenPayload | undefined => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    return decoded;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

module.exports = { generateToken, verifyToken };
