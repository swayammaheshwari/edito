import express from "express";
import usersRouter from "./controllers/users.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use("/api/users", usersRouter);

app.get("/", (_req, res) => {
  res.send("🚀 Edito Server is running");
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});