import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export function generateToken(userId: string): string {
  const tokenPayload = { userId: userId };
  console.log(SECRET_KEY);
  console.log(tokenPayload);
  const token = jwt.sign(userId, SECRET_KEY, { expiresIn: "1h" });
  return token;
}

export function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, SECRET_KEY) as { userId: string };
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
