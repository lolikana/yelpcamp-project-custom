import flash from 'connect-flash';
import MongoDBStore from 'connect-mongo';
import * as dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import engine from 'ejs-mate';
import express, { NextFunction, Request, Response } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import session from 'express-session';
import helmet from 'helmet';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import path from 'path';

import { User } from './models';
import { router as authRoutes } from './routes/auth';
import { router as campgroundsRoutes } from './routes/campgrounds';
import { router as reviewsRoutes } from './routes/reviews';
import { ExpressError } from './utils';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

const dbUrl = `${process.env.DB_URL}`;
// const dbUrl = 'mongodb://127.0.0.1:27017/yelp-camp';

mongoose
  .connect(dbUrl)
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

const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: `${process.env.SESSION_SECRET}`
  }
});

store.on('error', (err: unknown) => {
  console.log(err);
});

const sessionConfig = {
  store,
  name: '_ycc',
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: true,
  cookie: {
    HttpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(mongoSanitize());

const scriptSrcUrls = [
  'https://stackpath.bootstrapcdn.com/',
  'https://api.tiles.mapbox.com/',
  'https://api.mapbox.com/',
  'https://kit.fontawesome.com/',
  'https://cdnjs.cloudflare.com/',
  'https://cdn.jsdelivr.net'
];
const styleSrcUrls = [
  'https://kit-free.fontawesome.com/',
  'https://stackpath.bootstrapcdn.com/',
  'https://api.mapbox.com/',
  'https://api.tiles.mapbox.com/',
  'https://fonts.googleapis.com/',
  'https://use.fontawesome.com/'
];
const connectSrcUrls = [
  'https://api.mapbox.com/',
  'https://a.tiles.mapbox.com/',
  'https://b.tiles.mapbox.com/',
  'https://events.mapbox.com/'
];
const fontSrcUrls: never[] = [];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", 'blob:'],
      objectSrc: [],
      imgSrc: [
        "'self'",
        'blob:',
        'data:',
        'https://res.cloudinary.com/dgjgwco0f/',
        'https://images.unsplash.com/',
        'https://www.theglobeandmail.com/resizer/'
      ],
      fontSrc: ["'self'", ...fontSrcUrls]
    }
  })
);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
passport.use(new LocalStrategy.Strategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', authRoutes);
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
