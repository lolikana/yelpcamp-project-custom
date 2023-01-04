import { NextFunction, Request, Response } from 'express';

import { ReviewModel } from '../models/review';

const isReviewAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id, reviewId } = req.params;
  const review = await ReviewModel.findById(reviewId);
  if (review?.author._id.equals((req.user as any)._id) === false) {
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect(`/campgrounds/${id}`);
  }
  return next();
};

export default isReviewAuthor;
