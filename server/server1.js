import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const { Pool } = pkg;

const { search } = req.query;
let query = 'SELECT * FROM bosses';
let params = [];
if (search) {
  query += ' WHERE title ILIKE $1 OR description ILIKE $1';
  params = [`%${search}%`];
}
const result = await pool.query(query, params);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,  // Trust ignores this, but keep for fallback
  port: process.env.DB_PORT,
  ssl: false  // Disable SSL for local trust
});

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../client")));

// API: Get all bosses
app.get("/api/bosses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bosses ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// API: Get single boss by slug
app.get("/api/bosses/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query("SELECT * FROM bosses WHERE slug = $1", [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Boss not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));