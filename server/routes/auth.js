import { Router } from "express";
import User from "../models/User.js";
import { generateToken } from "../lib/jwt.js";
import passport from "../config/passport.js";

const router = Router();

// Initiera Google-inloggning
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Callback efter Google-inloggning
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { user, token } = req.user;
    // Omdirigera till frontend med token i URL:en
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`,
    );
  },
);
// Registrering med e-post/lösenord
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "E-postadressen används redan" });
    }
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

// Inloggning med e-post/lösenord
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

// Hämta aktuell användare (för att verifiera token)
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

export default router;
