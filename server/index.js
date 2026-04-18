import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import contactRoutes from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/konsult";

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "stodpartner-api" });
});

app.use("/api/contact", contactRoutes);

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB ansluten");

  app.listen(PORT, () => {
    console.log(`API lyssnar på http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
