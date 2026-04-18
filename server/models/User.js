import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false }, // select: false döljer vid vanliga queries
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    // Koppling till användarens egna meddelanden
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "ContactMessage" }],
  },
  { timestamps: true },
);

// Hasha lösenord innan det sparas
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Metod för att jämföra lösenord
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
