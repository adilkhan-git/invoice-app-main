import { generateToken, hashPassword } from "../auth/authUtils";

const BASE_URL = "http://localhost:8000";

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<string> {
  const hashedPassword = await hashPassword(password);

  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password: hashedPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  const { token } = await response.json();

  return token;
}
