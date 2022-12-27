import { Router } from 'express';

import { validateReview } from '../libs/validations';
import { CampgroundModel } from '../models/campgrounds';
import { ReviewModel } from '../models/review';
import { catchAsync } from '../utils/catchAsync';

// Need to merge params to get campgrounds/:id
export const router = Router({ mergeParams: true });

router.post(
  '/',
  validateReview,
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

router.delete(
  '/:reviewId',
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await CampgroundModel.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId }
    });
    await ReviewModel.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
  })
);
