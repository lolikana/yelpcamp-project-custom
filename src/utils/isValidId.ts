import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

const isValidId = async (
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

export default isValidId;
