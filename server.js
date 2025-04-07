const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/tarot/random', async (req, res) => {
  const count = req.query.count || 3;
  const response = await axios.get(`https://tarotapi.dev/api/v1/cards/random?n=${count}`);
  res.json(response.data);
});

app.get('/api/tarot/:name_short', async (req, res) => {
  const { name_short } = req.params;
  const response = await axios.get(`https://tarotapi.dev/api/v1/cards/${name_short}`);
  res.json(response.data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});