import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, async (req, res, next) => {
  try {
    // Check if req.body has nested structure
    if (req.body.details) {
      return res.status(400).json({
        message: "Data cannot be nested!",
      });
    }

    // get fields from req.body
    const { userId, propertyId, rating, comment } = req.body;

    // Basic validation in router
    if (
      typeof userId !== "string" ||
      typeof propertyId !== "string" ||
      typeof rating !== "number" ||
      typeof comment !== "string"
    ) {
      return res.status(400).json({
        message:
          "userId, propertyId and comment has to be strings, rating has to be a number.",
      });
    }

    const newReview = await createReview({
      userId,
      propertyId,
      rating,
      comment,
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("unexpected error:", error);
    return res.status(500).json({
      message: "Unexpected error, please try again later",
    });
  }
});

// Get all reviews with optional query parameters
router.get("/", async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.query;

    // Creëer een filterobject in de router
    const filter = {};
    if (userId) filter.userId = userId;
    if (propertyId) filter.propertyId = propertyId;
    if (rating) filter.rating = rating;
    if (comment) filter.comment = comment;

    // Call the service with filter
    const reviews = await getReviews(filter);

    if (reviews.length === 0) {
      return res.status(404).json({
        message: "No reviews found matching the criteria.",
      });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res.status(500).json({
      message:
        error.message || "Unexpected error occurred, please try again later.",
    });
  }
});

// Get a specific review by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    // If the review exists, return it
    return res.status(200).json(review);
  } catch (error) {
    // If the error is related to not finding the review, return a 404 status code
    if (error.message.includes("not found")) {
      return res.status(404).json({
        message: error.message,
      });
    }

    // For any other errors, return a 500 status code
    console.error("Unexpected error:", error);
    return res.status(500).json({
      message: "Unexpected error, please try again later",
    });
  }
});

// Update a review by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
    const review = await updateReviewById(id, {
      userId,
      propertyId,
      rating,
      comment,
    });

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a review by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReviewById(id);

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
