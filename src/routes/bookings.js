import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    // Basic validation
    if (
      !userId ||
      !propertyId ||
      !checkinDate ||
      !checkoutDate ||
      !numberOfGuests ||
      !totalPrice ||
      !bookingStatus
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Date validation
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);

    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
      return res.status(400).json({
        message: "Invalid dates. Use valid ISO 8601 format (YYYY-MM-DD).",
      });
    }

    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

// Get all bookings with optional query parameters
router.get("/", async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.query;

    const filter = {};
    if (userId) filter.userId = userId;
    if (propertyId) filter.propertyId = propertyId;
    if (checkinDate) filter.checkinDate = checkinDate;
    if (checkoutDate) filter.checkoutDate = checkoutDate;
    if (numberOfGuests) filter.numberOfGuests = numberOfGuests;
    if (totalPrice) filter.totalPrice = totalPrice;
    if (bookingStatus) filter.bookingStatus = bookingStatus;

    // getBookings call with filter
    const bookings = await getBookings(filter);

    // Check bookings with specific userId
    if (userId) {
      if (bookings.length === 0) {
        return res
          .status(404)
          .json({ error: `No bookings found for user with id ${userId}` });
      }
      return res.status(200).json(bookings); // Return booking with match userId
    }

    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

// Get a specific booking by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      res.status(404).json({ message: `Booking with id ${id} not found` });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

// Update a booking by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const booking = await updateBookingById(id, {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a booking by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await deleteBookingById(id);

    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
