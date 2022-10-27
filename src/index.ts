import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import engine from 'ejs-mate';
import { CampgroundModel } from './models/campgrounds';

const app = express();

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req, res) => {
  res.render('index');
});

app.get('/campgrounds', async (_req, res) => {
  const campgrounds = await CampgroundModel.find({});
  res.render('campgrounds/index', { campgrounds });
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
