import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteBookingById = async (id) => {
  try {
    // Attempt to delete the booking
    const result = await prisma.booking.deleteMany({
      where: { id },
    });

    // If a booking was deleted, return the ID
    return result.count > 0 ? id : null;
  } catch (error) {
    // Log the error for debugging
    console.error("Error while deleting booking:", error);

    // Throw a specific error or a general one
    throw new Error("Failed to delete the booking. Please try again later.");
  } finally {
    // Ensure Prisma client disconnects
    await prisma.$disconnect();
  }
};

export default deleteBookingById;
