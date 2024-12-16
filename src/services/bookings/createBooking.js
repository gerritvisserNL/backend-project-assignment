import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  try {
    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        propertyId,
        OR: [
          {
            checkinDate: {
              lte: new Date(checkoutDate),
            },
            checkoutDate: {
              gte: new Date(checkinDate),
            },
          },
        ],
      },
    });

    if (overlappingBooking) {
      const error = new Error(
        "The accommodation is booked for the selected dates."
      );
      error.status = 409; // Conflict
      throw error;
    }

    // Create booking
    const newBooking = {
      userId,
      propertyId,
      checkinDate: new Date(checkinDate),
      checkoutDate: new Date(checkoutDate),
      numberOfGuests,
      totalPrice,
      bookingStatus,
    };

    const booking = await prisma.booking.create({
      data: newBooking,
    });

    return booking;
  } catch (error) {
    // Log the error with detailed context
    console.error("Error while creating booking:", {
      message: error.message,
      status: error.status || 500,
      stack: error.stack,
      details: {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      },
    });

    if (error.status === 409) {
      throw error;
    } else {
      // General error for other cases
      const generalError = new Error(
        "Cannot create booking. Please try again later."
      );
      generalError.status = 500;
      throw generalError;
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default createBooking;
