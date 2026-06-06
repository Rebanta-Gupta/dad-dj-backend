import crypto from "crypto";

const SECRET = process.env.JWT_SECRET;

export const encrypt = (text) => {
  const cipher = crypto.createCipher("aes-256-ctr", SECRET);
  return cipher.update(text, "utf8", "hex") + cipher.final("hex");
};

export const decrypt = (hash) => {
  const decipher = crypto.createDecipher("aes-256-ctr", SECRET);
  return decipher.update(hash, "hex", "utf8") + decipher.final("utf8");
};