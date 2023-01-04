import { NextFunction, Request, Response } from 'express';

import { CampgroundModel } from '../models/campgrounds';

export const index = async (_req: Request, res: Response): Promise<void> => {
  const campgrounds = await CampgroundModel.find({});
  res.render('campgrounds/index', { campgrounds });
};

export const create = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const campground = new CampgroundModel(req.body.campground);
  campground.author = (req.user as any)._id;
  await campground.save();
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};

export const read = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const campground = await CampgroundModel.findById(id)
      .populate({ path: 'reviews', populate: { path: 'author' } })
      .populate('author');
    res.render(`campgrounds/detail`, { id, campground });
  } catch (err: unknown) {
    req.flash('error', 'Cannot find that campground');
    return res.redirect('/campgrounds');
    // next(new ExpressError('Campground not found', 404));
  }
};

export const updateForm = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const campground = await CampgroundModel.findById(id);
    res.render('campgrounds/edit', { campground });
  } catch (err: unknown) {
    req.flash('error', 'Cannot find that campground to edit');
    return res.redirect('/campgrounds');
  }
};

export const update = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const campground = await CampgroundModel.findByIdAndUpdate(
    id,
    {
      ...req.body.campground
    },
    { new: true }
  );
  req.flash('success', 'Successfully updated campground');
  res.redirect(`/campgrounds/${campground?._id}`);
};

export const destroy = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  await CampgroundModel.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted campground');
  res.redirect('/');
};
