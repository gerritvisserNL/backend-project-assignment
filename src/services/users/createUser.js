import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (newUser) => {
  try {
    // Create a new user in the database
    const user = await prisma.user.create({
      data: newUser,
    });

    return user;
  } catch (error) {
    // Log error details for debugging
    console.error(error);

    const err = new Error("Failed to create user");
    err.statusCode = 500;
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export default createUser;
