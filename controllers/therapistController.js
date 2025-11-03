const pool = require('../db');

const getAllTherapists = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM therapists');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

const createTherapist = async (req, res) => {
  const { title, name, email, location, years_practice, availability } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO therapists (title, name, email, location, years_practice, availability) VALUES (?, ?, ?, ?, ?, ?)',
      [title, name, email, location, years_practice, availability]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

const updateTherapist = async (req, res) => {
  const { id } = req.params;
  const { title, name, email, location, years_practice, availability } = req.body;

  try {
    await pool.query(
      'UPDATE therapists SET title=?, name=?, email=?, location=?, years_practice=?, availability=? WHERE id=?',
      [title, name, email, location, years_practice, availability, id]
    );
    res.json({ id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

const deleteTherapist = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM therapists WHERE id=?', [id]);
    res.json({ message: 'Therapist deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getAllTherapists,
  createTherapist,
  updateTherapist,
  deleteTherapist
};