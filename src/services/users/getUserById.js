import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserById = async (id) => {
  try {
    // Attempt to fetch the user based on the unique ID
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true, // Only return these fields, excluding the password
      },
    });

    // If no user is found, throw a 404 error
    if (!user) {
      const error = new Error(`User with ID ${id} not found`);
      error.statusCode = 404; // Set the status code to 404 if the user is not found
      throw error;
    }

    return user;
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching user by ID:", {
      message: error.message,
      stack: error.stack,
      userId: id, // Add the user ID to the logs to trace the issue
    });

    // Re-throw the error so that it can be handled by the router
    if (!error.statusCode) {
      error.statusCode = 500; // Default to a 500 status code if no status code is set
    }
    throw error;
  } finally {
    // Ensure that Prisma is disconnected after the operation, regardless of success or failure
    await prisma.$disconnect();
  }
};

export default getUserById;
