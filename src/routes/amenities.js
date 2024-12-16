import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import auth from "../middleware/auth.js";

const router = Router();

// Create a new amenity
router.post("/", auth, async (req, res, next) => {
  try {
    const { name } = req.body;

    // Basic validation
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        message: "Name is required!",
      });
    }

    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

// Get all amenities
router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

// Get a specific amenity by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    if (!amenity) {
      res.status(404).json({ message: `Amenity with id ${id} not found` });
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

// Update an amenity by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Call updateAmenityById
    const result = await updateAmenityById(id, { name });

    if (result.status === 404) {
      console.error(`Error message: ${result.message}`); // Log error message
      return res.status(404).json({ message: result.message });
    }

    res
      .status(result.status)
      .json({ message: result.message, data: result.data || null });
  } catch (error) {
    console.error("Error in Update Amenity by ID:", error);
    return next(error);
  }
});

// Delete an amenity by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await deleteAmenityById(id);

    if (amenity) {
      res.status(200).send({
        message: `Amenity with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Amenity with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
