const express = require('express');
const router = express.Router();

require('dotenv').config();

const VITE_GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

router.get('/allmaps', async (req, res) => {
  try {
    res.json({ googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
