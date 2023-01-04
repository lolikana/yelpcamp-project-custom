import { RequestHandler, Router } from 'express';

import * as campgrounds from '../controllers/campgrounds';
import { validateCampground } from '../libs/validations';
import { catchAsync } from '../utils/catchAsync';
import isAuthor from '../utils/isAuthor';
import isLoggedIn from '../utils/isLoggedIn';

export const router = Router();

router.get('/', catchAsync(campgrounds.index) as RequestHandler);

router.get('/new', isLoggedIn, (_req, res) => {
  res.render('campgrounds/new');
});

router.post(
  '/',
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.create) as RequestHandler
);

router.get('/:id', catchAsync(campgrounds.read) as RequestHandler);

router.get(
  '/:id/edit',
  isLoggedIn,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  isAuthor,
  catchAsync(campgrounds.updateForm) as RequestHandler
);

router.put(
  '/:id',
  isLoggedIn,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.update) as RequestHandler
);

router.delete(
  '/:id',
  isLoggedIn,
  catchAsync(campgrounds.destroy) as RequestHandler
);
