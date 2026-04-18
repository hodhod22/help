import { Router } from "express";
import Translation from "../models/Translation.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

// Hämta alla översättningar (öppen för alla)
router.get("/", async (req, res) => {
  try {
    const translations = await Translation.find();
    res.json(translations);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta översättningar" });
  }
});

// Uppdatera översättning (endast admin)
router.put("/:key", protect, adminOnly, async (req, res) => {
  try {
    const { key } = req.params;
    const { sv, en, ar } = req.body;
    const translation = await Translation.findOneAndUpdate(
      { key },
      { sv, en, ar },
      { upsert: true, new: true },
    );
    res.json(translation);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte uppdatera översättning" });
  }
});

export default router;
