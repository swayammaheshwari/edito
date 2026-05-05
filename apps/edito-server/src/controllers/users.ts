import express, { Router } from "express";
import db from "../db/sqliteConnect.js";

const router: Router = express.Router();

// Create a user
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const stmt = db.prepare("INSERT INTO users (name) VALUES (?)");
    const result = stmt.run(name);
    res.status(201).json({ id: result.lastInsertRowid, name });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get all users
router.get("/", (_req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM users");
    const users = stmt.all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
