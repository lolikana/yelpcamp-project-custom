import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { CampgroundModel } from '../models/campgrounds';
import { ReviewModel } from '../models/review';

export const isAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const campground = await CampgroundModel.findById(id);
  if (campground?.author._id.equals((req.user as any)._id) === false) {
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect(`/campgrounds/${id}`);
  }
  return next();
};

export const isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in');
    return res.redirect('/login');
  }
  return next();
};

export const isReviewAuthor = async (
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

export const isValidId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    req.flash('error', 'Invalid campground id');
    return res.redirect('/campgrounds');
  }
  return next();
};
