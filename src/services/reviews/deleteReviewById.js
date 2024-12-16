import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteReviewById = async (id) => {
  try {
    // Try to delete the review with the given ID
    const review = await prisma.review.deleteMany({
      where: { id },
    });

    // Return the ID if deletion was successful, otherwise return null
    return review.count > 0 ? id : null;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting review:", error);

    // Throw a generic error message to be handled elsewhere
    throw new Error("Unable to delete review. Please try again later.");
  } finally {
    // Ensure Prisma client is disconnected after operation
    await prisma.$disconnect();
  }
};

export default deleteReviewById;
