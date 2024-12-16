import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import auth from "../middleware/auth.js";

const router = Router();

// Create a new user
router.post("/", async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    // Validation: check if required fields are provided
    if (!username || !password || !name || !email || !phoneNumber) {
      return res.status(400).json({
        message:
          "Username, password, name, email, and phoneNumber are required!",
      });
    }

    // Call createUser with validated data
    const newUser = await createUser({
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    // Return the created user on success
    return res.status(201).json(newUser);
  } catch (error) {
    // Return error message and status code
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
});

// Get all users with optional query parameters
router.get("/", async (req, res, next) => {
  try {
    const { id, username, name, email, phoneNumber, profilePicture } =
      req.query;

    // Initialize filter object
    const filter = {};

    // Add filter for email and filter for username
    if (email) filter.email = email;
    if (username) filter.username = username;

    // Add filter fields only if they have values
    if (id) filter.id = id;
    if (name) filter.name = name;
    if (phoneNumber) filter.phoneNumber = phoneNumber;
    if (profilePicture) filter.profilePicture = profilePicture;

    // Call getUsers with the filter object
    const users = await getUsers(filter);

    if (email || username) {
      if (users.length === 0) {
        return res.status(404).json({
          error: `No user found with this ${email ? "email" : "username"}`,
        });
      }
      return res.status(200).json(users[0]); // Return first user with email
    }

    // Send the filtered users as response
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // validation: Check if id is a valid UUID
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
});

// Update a user by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    const updatedUser = await updateUserById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a user by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    if (deletedUser) {
      res
        .status(200)
        .json({ message: `User with id ${id} successfully deleted` });
    } else {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
