import { Router } from 'express';

import * as reviews from '../controllers/reviews';
import { validateReview } from '../libs/validations';
import { catchAsync } from '../utils/catchAsync';
import isLoggedIn from '../utils/isLoggedIn';
import isReviewAuthor from '../utils/isReviewAuthor';

// Need to merge params to get campgrounds/:id
export const router = Router({ mergeParams: true });

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.create));

router.delete(
  '/:reviewId',
  isLoggedIn,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  isReviewAuthor,
  catchAsync(reviews.destroy)
);
