import { NextFunction, Request, Response } from 'express';

import { CampgroundModel } from '../models/campgrounds';

const isAuthor = async (
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

export default isAuthor;
