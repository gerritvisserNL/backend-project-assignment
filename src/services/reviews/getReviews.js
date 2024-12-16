import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReviews = async (filter) => {
  try {
    // Get reviews using filter
    const reviews = await prisma.review.findMany({
      where: filter,
    });

    return reviews;
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching reviews:", error.message);
    // Throw new error
    throw new Error("Unable to fetch reviews. Please try again later.");
  }
};

export default getReviews;
