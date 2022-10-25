import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('HomePage');
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
