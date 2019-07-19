const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello ListeLot!');
});

app.listen(port, () => {
  console.log(`ListeLot listening on port ${port}`);
});