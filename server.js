const express = require('express');
const request = require('request');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/get-horoscope', (req, res) => {
  const sign = req.body.sign || 'aries';

  const options = {
    url: `https://aztro.sameerkumar.website/?sign=${sign}&day=today`,
    method: 'POST'
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(body));
    } else {
      res.status(500).send({ error: 'API request failed' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
