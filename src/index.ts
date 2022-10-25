import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost:27017/yelp-camp2');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
