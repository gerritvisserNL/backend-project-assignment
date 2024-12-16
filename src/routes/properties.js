import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    // Validate input data
    if (
      !title ||
      !description ||
      !location ||
      !pricePerNight ||
      !bedroomCount ||
      !bathRoomCount ||
      !maxGuestCount ||
      !hostId ||
      !rating
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    // Call the service
    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );

    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

// Get all properties with optional query parameters
router.get("/", async (req, res, next) => {
  try {
    // Get query parameters and set default values
    const location = req.query.location || "";
    const pricePerNight = req.query.pricePerNight
      ? parseFloat(req.query.pricePerNight)
      : undefined; // Cast to float
    const amenities = req.query.amenities || "";

    // Initialize an empty filter object
    const filter = {};

    // Add filters to the object only if they have a value
    if (location && typeof location === "string") {
      // Ensure the search is case-insensitive by converting both to lowercase
      filter.location = { contains: location.toLowerCase() }; // Remove `mode: "insensitive"`
    }

    if (pricePerNight && !isNaN(pricePerNight)) {
      filter.pricePerNight = { equals: pricePerNight }; // Filter by pricePerNight
    }

    if (amenities && typeof amenities === "string") {
      // Split the amenities string by commas and trim extra spaces
      const amenitiesArray = amenities
        .split(",")
        .map((amenity) => amenity.trim());

      // Only add the filter if the array is not empty
      if (amenitiesArray.length > 0) {
        filter.amenities = { some: { name: { in: amenitiesArray } } }; // Correct filter using `some`
      }
    }

    // Call getProperties() with the constructed filter
    const properties = await getProperties(filter);

    // Return the properties in the response
    res.json(properties);
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
});

// Get a specific property by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);
    res.status(200).json(property); // Property found, return it with status 200
  } catch (error) {
    // If an error was thrown in the service, handle it here
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error", // Default to 500 if no specific statusCode
    });
  }
});

// Update a property by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    const property = await updatePropertyById(id, {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });

    if (property) {
      res.status(200).send({
        message: `Property with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a property by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deletePropertyById(id);

    if (property) {
      res.status(200).send({
        message: `Property with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
