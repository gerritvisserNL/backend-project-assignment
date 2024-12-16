import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const login = async (username, password) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  // Find user by username
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return null; // User not found
  }

  // Compare the entered password directly with the stored password
  if (password !== user.password) {
    return null; // Incorrect password
  }

  // Generate a token
  const token = jwt.sign({ userId: user.id }, secretKey);

  return token;
};

export default login;
