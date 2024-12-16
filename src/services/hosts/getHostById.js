import { PrismaClient } from "@prisma/client";

const getHostById = async (id) => {
  const prisma = new PrismaClient();

  try {
    const host = await prisma.host.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        aboutMe: true,
        // Exclude the password field
      },
    });

    return host; // Return null if not found
  } catch (error) {
    console.error("Error retrieving host by ID:", error.message);
    throw new Error("Failed to retrieve host. Please try again later.");
  } finally {
    await prisma.$disconnect();
  }
};

export default getHostById;
