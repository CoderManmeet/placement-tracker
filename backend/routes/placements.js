// backend/routes/placements.js
import express from 'express';
import { pool } from '../db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Add new placement
router.post('/', auth, async (req, res) => {
  const { company, role, package: pkg } = req.body;
  try {
    const newPlacement = await pool.query(
      "INSERT INTO placements (company, role, package, student_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [company, role, pkg, req.user.id]
    );
    res.json(newPlacement.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get placements for logged-in student
router.get('/', auth, async (req, res) => {
  try {
    const placements = await pool.query(
      "SELECT * FROM placements WHERE student_id=$1 ORDER BY placement_date DESC",
      [req.user.id]
    );
    res.json(placements.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
