import mongoose from "mongoose";

const translationSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // t.ex. "contact.name"
    sv: { type: String, default: "" },
    en: { type: String, default: "" },
    ar: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Translation", translationSchema);
