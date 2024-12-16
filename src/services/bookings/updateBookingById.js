import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateBookingById = async (id, updatedBooking) => {
  try {
    // Update the booking by ID
    const booking = await prisma.booking.updateMany({
      where: { id },
      data: updatedBooking,
    });

    // Check if any booking was updated
    if (booking.count > 0) {
      return id; // Return the ID of the updated booking
    }

    // If no booking was updated, return null
    return null;
  } catch (error) {
    // Log the error for debugging
    console.error("Error while updating booking:", error);

    // Throw a specific error or a general one
    throw new Error("Failed to update booking. Please try again later.");
  } finally {
    // Ensure Prisma client disconnects
    await prisma.$disconnect();
  }
};

export default updateBookingById;
