const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/allnews', async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=pt`,
      {
        headers: {
          'X-Api-Key': NEWS_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
