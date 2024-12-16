import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // PrismaClient is created outside the function to avoid repeated creation

const updateReviewById = async (id, updatedReview) => {
  try {
    // Attempt to update the review by its ID with the provided updatedReview data
    const review = await prisma.review.updateMany({
      where: { id },
      data: updatedReview,
    });

    // Return the ID if at least one review was updated, otherwise return null
    return review.count > 0 ? id : null;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating review:", error.message);

    // Throw a generic error message to prevent exposing sensitive details to the user
    throw new Error("Cannot update review. Please try again later.");
  } finally {
    // Ensure the PrismaClient connection is closed to avoid memory leaks
    await prisma.$disconnect();
  }
};

export default updateReviewById;
