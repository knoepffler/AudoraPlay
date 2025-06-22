const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.post('/rating', (req, res) => {
  const { filename, rating } = req.body;
  if (!filename || !rating) {
    return res.status(400).send('Missing data');
  }

  const data = JSON.stringify({ filename, rating });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const url =
    'https://script.google.com/macros/s/AKfycbw6qmAUdbGpEh_aYnM8TaUA9-LcxSCbRdng_ArgCwXtJCHgTmNXr3fdhpXGWmdEetbwuA/exec';

  const request = https.request(url, options, googleRes => {
    googleRes.on('data', () => {});
    googleRes.on('end', () => res.sendStatus(200));
  });

  request.on('error', err => {
    console.error('Failed to forward rating', err);
    res.status(500).send('Error');
  });

  request.write(data);
  request.end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
