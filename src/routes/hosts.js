import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import auth from "../middleware/auth.js";

const router = Router();

// Create a new host
router.post("/", auth, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    // Check if all required fields are provided
    if (!username || !password || !name || !email || !phoneNumber) {
      return res.status(400).json({
        message:
          "Username, password, name, email, and phoneNumber are required.",
      });
    }

    // Call the createHost service
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );

    return res.status(201).json(newHost);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Get all hosts with optional query parameters
router.get("/", async (req, res, next) => {
  try {
    const { username, name, email, phoneNumber, profilePicture, aboutMe } =
      req.query;

    // Create empty filter object
    const filter = {};

    if (name) filter.name = name;

    if (username) filter.username = username;
    if (email) filter.email = email;
    if (phoneNumber) filter.phoneNumber = phoneNumber;
    if (profilePicture) filter.profilePicture = profilePicture;
    if (aboutMe) filter.aboutMe = aboutMe;

    // Call getHosts with filter
    const hosts = await getHosts(filter);

    // Give first match with given name
    if (name) {
      if (hosts.length === 0) {
        return res.status(404).json({ error: `No host found with this name` });
      }
      return res.status(200).json(hosts[0]);
    }

    res.json(hosts);
  } catch (error) {
    next(error);
  }
});

// Get a specific host by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);

    if (!host) {
      return res.status(404).json({ message: `Host with ID ${id} not found` });
    }

    res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

// Update a host by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const host = await updateHostById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    if (host) {
      res.status(200).send({
        message: `Host with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Host with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a host by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedHostId = await deleteHostById(id);

    if (deletedHostId) {
      return res.status(200).json({
        message: `Host with id ${deletedHostId} successfully deleted`,
      });
    }

    // If no host was deleted, send a 404
    return res.status(404).json({ message: "Host not found" });
  } catch (error) {
    next(error);
  }
});

export default router;
