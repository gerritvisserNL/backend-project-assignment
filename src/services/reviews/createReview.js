import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createReview = async (reqBody) => {
  try {
    const { userId, propertyId, rating, comment } = reqBody;

    const newReview = {
      userId,
      propertyId,
      rating,
      comment,
    };

    // Create the review in the database
    const review = await prisma.review.create({
      data: newReview,
    });

    return review;
  } catch (error) {
    // Log for debugging
    console.error("Error creating review", {
      message: error.message,
      stack: error.stack,
      details: reqBody,
    });

    // Throw generic error for user
    throw new Error("Cannot create a review. Please, try again later");
  } finally {
    await prisma.$disconnect();
  }
};

export default createReview;
