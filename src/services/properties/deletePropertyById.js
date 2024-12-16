import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deletePropertyById = async (id) => {
  try {
    // Delete property based on the provided ID
    const property = await prisma.property.deleteMany({
      where: { id },
    });

    // If a property was deleted, return the ID, otherwise return null
    return property.count > 0 ? id : null;
  } catch (error) {
    // Handle any errors
    const err = new Error("Failed to delete property");
    err.statusCode = 500; // Internal Server Error
    throw err;
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
};

export default deletePropertyById;
