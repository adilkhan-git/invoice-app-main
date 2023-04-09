import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken-promisified";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserDB {
  users: User[];
}

const users: UserDB = require("../../db.json");

const SECRET_KEY = "mysecretkey";

export async function generateToken(userId: string): Promise<string> {
  const tokenPayload = { userId: userId };
  const token = await jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "1h" });
  return token;
}

export async function verifyToken(token: string): Promise<{ userId: string }> {
  const decoded = await jwt.verify(token, SECRET_KEY);
  return decoded as { userId: string };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(
  email: string,
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const user = users.users.find((u) => u.email === email);
  if (!user) {
    return false;
  }
  return bcrypt.compare(password, hashedPassword);
}
