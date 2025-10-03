// server.js (ES module version)
import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config({ path: './password.env' });

const app = express();
app.use(express.static('public'));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect(err => {
  if (err) console.error('DB connection error:', err);
  else console.log('Connected to PostgreSQL!');
});

// Example route
app.get('/bosses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bosses ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
