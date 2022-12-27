// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import engine from 'ejs-mate';
import express, { NextFunction, Request, Response } from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import path from 'path';

import { router as campgroundsRoutes } from './routes/campgrounds';
import { router as reviewsRoutes } from './routes/reviews';
import { ExpressError } from './utils/ExpressError';

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(res => res)
  .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);

app.get('/', (_req, res) => {
  res.render('index');
});

app.all('*', (_req, _res, next) => {
  next(new ExpressError('Page Not Found!!', 404));
});

app.use(
  (err: ExpressError, _req: Request, res: Response, _next: NextFunction) => {
    const { status = 500, message = 'Oops, something went wrong' } = err;
    res.status(status).render('error', { message, err });
  }
);

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
