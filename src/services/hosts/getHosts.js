import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHosts = async (filter) => {
  try {
    const hosts = await prisma.host.findMany({
      where: filter,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        aboutMe: true,
      },
    });

    return hosts;
  } catch (error) {
    console.error("Error retrieving hosts:", error.message);
    throw new Error("Failed to retrieve hosts. Please try again later.");
  } finally {
    await prisma.$disconnect();
  }
};

export default getHosts;
