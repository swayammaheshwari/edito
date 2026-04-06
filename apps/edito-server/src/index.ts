import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (_req, res) => {
  res.send("🚀 Edito Server is running");
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});