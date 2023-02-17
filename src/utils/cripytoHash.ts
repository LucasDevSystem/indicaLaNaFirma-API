const CryptoJS = require("crypto-js");

const SECRET = process.env.ENCRYPTION_SECRET;

const cryptoPass = (password: string) => {
  const ciphertext = CryptoJS.AES.encrypt(password, SECRET).toString();

  return ciphertext;
};

const decryptPass = (password: string) => {
  const bytes = CryptoJS.AES.decrypt(password, SECRET);

  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { cryptoPass, decryptPass };
