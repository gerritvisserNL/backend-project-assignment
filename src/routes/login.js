import { Router } from "express";
import login from "../services/auth/login.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await login(username, password);

    if (!token) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Successfully logged in!", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

export default router;
