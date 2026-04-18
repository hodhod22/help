import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";
import User from "../models/User.js";
import { contactMessage, pickLang } from "../lib/contactMessages.js";
import { verifyToken } from "../lib/jwt.js";
import { protect } from "../middleware/auth.js";
const router = Router();

router.post("/", async (req, res) => {
  const lang = pickLang(req.headers["accept-language"]);
  try {
    const { name, email, phone, company, message } = req.body ?? {};
    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ error: contactMessage("validation", lang) });
    }

    // Hämta userId från token om inloggad
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);
      if (decoded) userId = decoded.id;
    }

    const doc = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      company: company != null ? String(company).trim() : "",
      message: String(message).trim(),
      userId,
    });

    if (userId) {
      await User.findByIdAndUpdate(userId, { $push: { messages: doc._id } });
    }

    return res
      .status(201)
      .json({ id: doc._id, message: contactMessage("success", lang) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: contactMessage("saveFailed", lang) });
  }
});
// 🆕 GET /my – hämta inloggad användares egna meddelanden
router.get("/my", protect, async (req, res) => {
  try {
    const messages = await ContactMessage.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte hämta meddelanden" });
  }
});
export default router;
