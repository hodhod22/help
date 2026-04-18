import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";
import { contactMessage, pickLang } from "../lib/contactMessages.js";

const router = Router();

router.post("/", async (req, res) => {
  const lang = pickLang(req.headers["accept-language"]);

  try {
    const { name, email, company, message } = req.body ?? {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: contactMessage("validation", lang),
      });
    }

    const doc = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim(),
      company: company != null ? String(company).trim() : "",
      message: String(message).trim(),
    });

    return res.status(201).json({
      id: doc._id,
      message: contactMessage("success", lang),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: contactMessage("saveFailed", lang),
    });
  }
});

export default router;
