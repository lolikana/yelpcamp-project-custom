// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import engine from 'ejs-mate';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response
} from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import path from 'path';

import { validateCampground } from './libs/validations';
import { CampgroundModel } from './models/campgrounds';
import { ReviewModel } from './models/review';
import { catchAsync } from './utils/catchAsync';
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

app.get('/', (_req, res) => {
  res.render('index');
});

app.get(
  '/campgrounds',
  catchAsync(async (_req, res) => {
    const campgrounds = await CampgroundModel.find({});
    res.render('campgrounds/index', { campgrounds });
  }) as RequestHandler
);

app.get('/campgrounds/new', (_req, res) => {
  res.render('campgrounds/new');
});

app.post(
  '/campgrounds',
  validateCampground,
  catchAsync(async (req, res, _next) => {
    const campground = new CampgroundModel(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  }) as RequestHandler
);

app.get(
  '/campgrounds/:id',
  catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const campground = await CampgroundModel.findById(id);
      res.render(`campgrounds/detail`, { id, campground });
    } catch (err: unknown) {
      next(new ExpressError('Campground not found', 404));
    }
  }) as RequestHandler
);

app.get(
  '/campgrounds/:id/edit',
  catchAsync(async (req, res) => {
    const campground = await CampgroundModel.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
  }) as RequestHandler
);

app.put(
  '/campgrounds/:id',
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await CampgroundModel.findByIdAndUpdate(
      id,
      {
        ...req.body.campground
      },
      { new: true }
    );
    res.redirect(`/campgrounds/${campground?._id}`);
  }) as RequestHandler
);

app.delete(
  '/campgrounds/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await CampgroundModel.findByIdAndDelete(id);

    res.redirect('/campgrounds');
  }) as RequestHandler
);

app.post(
  '/campgrounds/:id/reviews',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await CampgroundModel.findById(id);
    const review = new ReviewModel(req.body.review);
    campground?.reviews.push(review.id);
    await campground?.save();
    await review.save();
    res.redirect(`/campgrounds/${campground?._id}`);
  })
);

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
