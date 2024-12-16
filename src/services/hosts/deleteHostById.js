import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteHostById = async (id) => {
  try {
    // Check if host exists
    const hostExists = await prisma.host.findUnique({
      where: { id },
    });

    if (!hostExists) {
      throw {
        status: 404,
        message: "Host not found",
      };
    }

    // Remove related properties with host first
    await prisma.property.deleteMany({
      where: {
        hostId: id,
      },
    });

    // Remove host
    await prisma.host.delete({
      where: { id },
    });

    // Return id of removed host
    return id;
  } catch (error) {
    console.error("Error deleting host:", error);
    // Throw an error with correct status and message for the route
    throw {
      status: error.status || 500,
      message: error.message || "Failed to delete host.",
    };
  }
};

export default deleteHostById;
