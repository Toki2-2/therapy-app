require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const therapistRoutes = require('./routes/therapistRoutes');
const clientRoutes = require('./routes/clientRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

app.use('/api/therapists', therapistRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/sessions', sessionRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});