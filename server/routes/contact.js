// server/routes/contact.js
import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";
import { contactMessage, pickLang } from "../lib/contactMessages.js";

const router = Router();

router.post("/", async (req, res) => {
  const lang = pickLang(req.headers["accept-language"]);
  try {
    // 🆕 Lägg till 'phone' här
    const { name, email, phone, company, message } = req.body ?? {};

    // Uppdatera valideringen: kräv name, email, phone, message
    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ error: contactMessage("validation", lang) });
    }

    const doc = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(), // 🆕
      company: company != null ? String(company).trim() : "",
      message: String(message).trim(),
    });

    return res
      .status(201)
      .json({ id: doc._id, message: contactMessage("success", lang) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: contactMessage("saveFailed", lang) });
  }
});

export default router;
