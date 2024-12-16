import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (filter) => {
  try {
    // Retrieve properties with the provided filter
    const properties = await prisma.property.findMany({
      where: filter,
    });
    return properties;
  } catch (error) {
    console.error("Error retrieving properties:", error);
    throw new Error("Failed to retrieve properties. Please try again later.");
  }
};

export default getProperties;
