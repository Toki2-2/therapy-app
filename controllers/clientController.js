const pool = require('../db');

const getAllClients = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clients');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

const createClient = async (req, res) => {
  const { name, email, phone, regularity } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO clients (name, email, phone, regularity) VALUES (?, ?, ?, ?)',
      [name, email, phone, regularity]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getAllClients,
  createClient
};