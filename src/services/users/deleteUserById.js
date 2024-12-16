import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUserById = async (id) => {
  try {
    // Attempt to delete the user with the provided ID
    const user = await prisma.user.deleteMany({
      where: { id },
    });

    // If a user was deleted, return the ID; otherwise, return null
    return user.count > 0 ? id : null;
  } catch (error) {
    // Log the error details for debugging purposes
    console.error("Error deleting user", {
      message: error.message,
      stack: error.stack,
      userId: id, // Include the user ID to help identify which user failed to delete
    });

    // Throw a new error with a user-friendly message
    // This prevents sensitive error details from being exposed to the user
    throw new Error("Failed to delete user. Please try again later.");
  } finally {
    // Ensure the Prisma client disconnects, whether the operation succeeded or failed
    await prisma.$disconnect();
  }
};

export default deleteUserById;
