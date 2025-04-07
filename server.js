const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Daily horoscope endpoint
app.get('/api/horoscope/daily', async (req, res) => {
  const sign = req.query.sign || 'Aries';
  const day = req.query.day || 'TODAY';
  
  try {
    console.log('Requesting horoscope for:', { sign, day }); // Debug log
    const response = await axios.get('https://aztro.sameerkumar.website/', {
      method: 'POST',
      params: { sign: sign, day: day }
    });
    console.log('API Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    res.status(500).json({ error: 'Failed to fetch daily horoscope' });
  }
});

// Weekly horoscope endpoint
app.get('/api/horoscope/weekly', async (req, res) => {
  const sign = req.query.sign || 'Aries';
  
  try {
    const response = await axios.get(`https://horoscope-api.com/api/v1/get-horoscope/weekly`, {
      params: { sign },
    });
    console.log('Weekly Horoscope API Response:', response.data); // Log the API response
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weekly horoscope:', error.message);
    res.status(500).json({ error: 'Failed to fetch weekly horoscope' });
  }
});

// Monthly horoscope endpoint
app.get('/api/horoscope/monthly', async (req, res) => {
  const sign = req.query.sign || 'Aries';
  
  try {
    const response = await axios.get(`https://horoscope-api.com/api/v1/get-horoscope/monthly`, {
      params: { sign },
    });
    console.log('Monthly Horoscope API Response:', response.data); // Log the API response
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching monthly horoscope:', error.message);
    res.status(500).json({ error: 'Failed to fetch monthly horoscope' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});