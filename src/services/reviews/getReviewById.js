import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReviewById = async (id) => {
  try {
    // Retrieve a single review by its unique ID
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      // If no review is found, throw an error with a custom message
      throw new Error(`Review with id ${id} not found`);
    }

    return review;
  } catch (error) {
    // Log the error and rethrow it for handling in the router
    console.error("Error fetching review", error.message);
    throw error;
  }
};

export default getReviewById;
