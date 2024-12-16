import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAmenities = async () => {
  try {
    const amenities = await prisma.amenity.findMany();
    return amenities;
  } catch (error) {
    console.error("Error retrieving amenities:", error);
    throw new Error("Failed to retrieve amenities");
  } finally {
    await prisma.$disconnect();
  }
};

export default getAmenities;
