const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (user: any) => {
  const token = jwt.sign(user, SECRET_KEY, { algorithm: "HS256" });

  return token;
};

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = { generateToken, verifyToken };
