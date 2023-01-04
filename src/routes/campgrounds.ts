import { RequestHandler, Router } from 'express';

import * as campgrounds from '../controllers/campgrounds';
import { validateCampground } from '../libs/validations';
import { catchAsync } from '../utils/catchAsync';
import isAuthor from '../utils/isAuthor';
import isLoggedIn from '../utils/isLoggedIn';

export const router = Router();

router
  .route('/')
  .get(catchAsync(campgrounds.index) as RequestHandler)
  .post(
    isLoggedIn,
    validateCampground,
    catchAsync(campgrounds.create) as RequestHandler
  );

router.get('/new', isLoggedIn, (_req, res) => {
  res.render('campgrounds/new');
});

router
  .route('/:id')
  .get(catchAsync(campgrounds.read) as RequestHandler)
  .put(
    isLoggedIn,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.update) as RequestHandler
  )
  .delete(isLoggedIn, catchAsync(campgrounds.destroy) as RequestHandler);

router.get(
  '/:id/edit',
  isLoggedIn,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  isAuthor,
  catchAsync(campgrounds.updateForm) as RequestHandler
);
