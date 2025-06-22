const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const statsFile = path.join(__dirname, 'statistik.csv');

app.post('/rating', (req, res) => {
  const { filename, rating } = req.body;
  if (!filename || !rating) {
    return res.status(400).send('Missing data');
  }
  const line = `${filename},${rating}\n`;
  fs.appendFile(statsFile, line, (err) => {
    if (err) {
      console.error('Failed to save rating', err);
      return res.status(500).send('Error');
    }
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
