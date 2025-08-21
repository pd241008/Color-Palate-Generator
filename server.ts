//express server for Rate Limit

import express from "express";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use(limiter);

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Express + TypeScript Server with Rate Limiting");
});

app.get("/api/colors", (req, res) => {
  res.json({ colors: ["#FF5733", "#33FF57", "#3357FF"] });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
