import { Request, Response } from 'express';

import { CampgroundModel } from '../models/campgrounds';
import { ReviewModel } from '../models/review';

export const create = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const campground = await CampgroundModel.findById(id);
  const review = new ReviewModel(req.body.review);
  review.author = (req.user as any)._id;
  campground?.reviews.push(review.id);
  await campground?.save();
  await review.save();
  req.flash('success', 'Created new review');
  res.redirect(`/campgrounds/${campground?._id}`);
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  const { id, reviewId } = req.params;
  await CampgroundModel.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId }
  });
  await ReviewModel.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review');
  res.redirect(`/campgrounds/${id}`);
};
