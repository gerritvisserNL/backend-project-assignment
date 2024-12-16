import { PrismaClient } from "@prisma/client";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const newHost = {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  };

  const prisma = new PrismaClient();

  try {
    // Create a new host
    const host = await prisma.host.create({
      data: newHost,
    });

    return host;
  } catch (error) {
    console.error("Error creating host:", error);

    const err = new Error("Failed to create host");
    err.statusCode = 500;
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export default createHost;
