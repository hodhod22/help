import { Router } from "express";
import User from "../models/User.js";
import { generateToken, verifyToken } from "../lib/jwt.js";
import { protect } from "../middleware/auth.js";
import passport from "../config/passport.js";

const router = Router();

// Registrering
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "E-postadressen används redan" });
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id, user.role);
    res
      .status(201)
      .json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    res.status(500).json({ error: "Registrering misslyckades" });
  }
});

// Inloggning
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Ogiltig e-post eller lösenord" });
    }
    const token = generateToken(user._id, user.role);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Inloggning misslyckades" });
  }
});

// Hämta aktuell användare
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Ingen token" });
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: "Ogiltig token" });
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta användare" });
  }
});

router.put("/users/profile", protect, async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, avatar },
      { new: true, runValidators: true },
    ).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte uppdatera profil" });
  }
});

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { user, token } = req.user;
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`,
    );
  },
);

export default router;
