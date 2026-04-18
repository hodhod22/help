import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();
router.use(protect, adminOnly);

// Hämta alla meddelanden
router.get("/messages", async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta meddelanden" });
  }
});

// Hämta alla användare
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta användare" });
  }
});

// Uppdatera användarroll
router.put("/users/:id/role", async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role))
      return res.status(400).json({ error: "Ogiltig roll" });
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true },
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte uppdatera roll" });
  }
});

export default router;
