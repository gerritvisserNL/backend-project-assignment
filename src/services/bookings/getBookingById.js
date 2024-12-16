import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookingById = async (id) => {
  try {
    // Attempt to retrieve the booking by its ID
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    // If no booking is found, return null
    return booking;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error while retrieving booking by ID:", error);

    // Throw a general error with a message
    throw new Error("Failed to retrieve booking. Please try again later.");
  } finally {
    // Ensure that Prisma client disconnects after the query
    await prisma.$disconnect();
  }
};

export default getBookingById;
