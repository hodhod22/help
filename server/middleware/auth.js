import { verifyToken } from "../lib/jwt.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Inte auktoriserad" });
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: "Ogiltig token" });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Inte auktoriserad" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Åtkomst nekad – admin krävs" });
  }
  next();
};
