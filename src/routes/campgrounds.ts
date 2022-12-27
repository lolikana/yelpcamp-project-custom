import { RequestHandler, Router } from 'express';

import { validateCampground } from '../libs/validations';
import { CampgroundModel } from '../models/campgrounds';
import { catchAsync } from '../utils/catchAsync';
import { ExpressError } from '../utils/ExpressError';

export const router = Router();

router.get(
  '/',
  catchAsync(async (_req, res) => {
    const campgrounds = await CampgroundModel.find({});
    res.render('campgrounds/index', { campgrounds });
  }) as RequestHandler
);

router.get('/new', (_req, res) => {
  res.render('campgrounds/new');
});

router.post(
  '/',
  validateCampground,
  catchAsync(async (req, res, _next) => {
    const campground = new CampgroundModel(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
  }) as RequestHandler
);

router.get(
  '/:id',
  catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const campground = await CampgroundModel.findById(id).populate('reviews');
      res.render(`campgrounds/detail`, { id, campground });
    } catch (err: unknown) {
      next(new ExpressError('Campground not found', 404));
    }
  }) as RequestHandler
);

router.get(
  '/:id/edit',
  catchAsync(async (req, res) => {
    const campground = await CampgroundModel.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
  }) as RequestHandler
);

router.put(
  '/:id',
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

router.delete(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await CampgroundModel.findByIdAndDelete(id);

    res.redirect('/');
  }) as RequestHandler
);
