import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateHostById = async (id, updatedHost) => {
  try {
    const host = await prisma.host.updateMany({
      where: { id },
      data: updatedHost,
    });

    return host.count > 0 ? id : null;
  } catch (error) {
    console.error("Error updating host:", error.message);

    const err = new Error("Failed to update host. Please try again.");
    err.statusCode = 500;

    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export default updateHostById;
