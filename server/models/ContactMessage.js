// server/models/ContactMessage.js
import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    // 🆕 Lägg till detta:
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model("ContactMessage", contactMessageSchema);
