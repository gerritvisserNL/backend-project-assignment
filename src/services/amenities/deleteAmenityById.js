import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAmenityById = async (id) => {
  try {
    const event = await prisma.amenity.deleteMany({
      where: { id },
    });

    return event.count > 0 ? id : null;
  } catch (error) {
    console.error("Error deleting amenity:", error);
    throw new Error("Failed to delete amenity");
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteAmenityById;
