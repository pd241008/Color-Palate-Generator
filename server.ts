<<<<<<< HEAD
=======
//express server for Rate Limit

>>>>>>> e006b6261e2523cd863facbd86ea0aef6a9a6996
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
<<<<<<< HEAD
  res.send("🚀 Express + TypeScript Server with Rate Limiting");
=======
  res.send(" Express + TypeScript Server with Rate Limiting");
>>>>>>> e006b6261e2523cd863facbd86ea0aef6a9a6996
});

app.get("/api/colors", (req, res) => {
  res.json({ colors: ["#FF5733", "#33FF57", "#3357FF"] });
});

app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`✅ Server running at http://localhost:${PORT}`);
=======
  console.log(` Server running at http://localhost:${PORT}`);
>>>>>>> e006b6261e2523cd863facbd86ea0aef6a9a6996
});
