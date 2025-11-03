const pool = require('../db');

const getAllSessions = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sessions');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

const createSession = async (req, res) => {
  const { therapist_id, client_id, notes, date, length } = req.body;
  
  if (!therapist_id || !client_id || !date) {
    return res.status(400).json({ error: 'Therapist ID, Client ID and date are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO sessions (therapist_id, client_id, notes, date, length) VALUES (?, ?, ?, ?, ?)',
      [therapist_id, client_id, notes, date, length]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getAllSessions,
  createSession
};