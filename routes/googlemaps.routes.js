const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

router.get('/allmaps', async (req, res) => {
  try {
    const { addresses } = req.query;

    // Check if addresses are provided
    if (!addresses || !Array.isArray(addresses)) {
      return res
        .status(400)
        .json({ error: 'Addresses parameter is missing or not an array' });
    }

    const points = [];

    for (const address of addresses) {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address: address,
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );

      // Extract latitude and longitude from the response
      const { lat, lng } = response.data.results[0].geometry.location;

      // Add the point to the points array
      points.push({ lat, lng });
    }

    res.json(points);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
