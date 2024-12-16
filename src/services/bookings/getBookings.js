import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookings = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  try {
    // Empty filter object
    const filter = {};

    if (userId && typeof userId === "object" && userId.userId) {
      filter.userId = userId.userId; // Get userId out the object
    } else if (userId) {
      filter.userId = userId; // If userId is a string, use it.
    }

    // Only add fields to filter that have a value
    if (propertyId) filter.propertyId = propertyId;
    if (checkinDate) filter.checkinDate = new Date(checkinDate);
    if (checkoutDate) filter.checkoutDate = new Date(checkoutDate);
    if (numberOfGuests) filter.numberOfGuests = Number(numberOfGuests);
    if (totalPrice) filter.totalPrice = Number(totalPrice);
    if (bookingStatus) filter.bookingStatus = bookingStatus;

    // Retrieve bookings with filter
    const bookings = await prisma.booking.findMany({
      where: filter,
    });

    return bookings;
  } catch (error) {
    // Log the error for debugging
    console.error("Error while retrieving bookings:", error);

    // Throw a specific error or a general one
    throw new Error("Failed to retrieve bookings. Please try again later!");
  } finally {
    // Ensure Prisma client disconnects
    await prisma.$disconnect();
  }
};

export default getBookings;
