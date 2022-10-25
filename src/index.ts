import express from 'express';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (_req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
