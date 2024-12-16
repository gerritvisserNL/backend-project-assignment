import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAmenityById = async (id) => {
  try {
    const amenity = await prisma.amenity.findUnique({
      where: { id },
    });

    return amenity;
  } catch (error) {
    console.error("Error retrieving amenity by id:", error);
    throw new Error("Failed to retrieve amenity by id");
  } finally {
    await prisma.$disconnect();
  }
};

export default getAmenityById;
