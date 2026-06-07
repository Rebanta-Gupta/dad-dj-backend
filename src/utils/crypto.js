import crypto from "crypto";

const SECRET = process.env.JWT_SECRET;

// Derive a fixed 32-byte key from the secret
const getKey = () => crypto.createHash("sha256").update(SECRET).digest();

const IV_LENGTH = 16;

// FIX: createCipher/createDecipher are deprecated and removed in Node 22+.
// Using createCipheriv/createDecipheriv with a random IV prepended to the output.
export const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-ctr", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  // Prepend IV so we can recover it during decryption
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (hash) => {
  const [ivHex, encryptedHex] = hash.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-ctr", getKey(), iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
};