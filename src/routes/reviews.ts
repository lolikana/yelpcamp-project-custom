import { Router } from 'express';

import { validateReview } from '../libs/validations';
import { CampgroundModel } from '../models/campgrounds';
import { ReviewModel } from '../models/review';
import { catchAsync } from '../utils/catchAsync';
import isLoggedIn from '../utils/isLoggedIn';
import isReviewAuthor from '../utils/isReviewAuthor';

// Need to merge params to get campgrounds/:id
export const router = Router({ mergeParams: true });

router.post(
  '/',
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await CampgroundModel.findById(id);
    const review = new ReviewModel(req.body.review);
    review.author = (req.user as any)._id;
    campground?.reviews.push(review.id);
    await campground?.save();
    await review.save();
    req.flash('success', 'Created new review');
    res.redirect(`/campgrounds/${campground?._id}`);
  })
);

router.delete(
  '/:reviewId',
  isLoggedIn,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await CampgroundModel.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId }
    });
    await ReviewModel.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/campgrounds/${id}`);
  })
);
