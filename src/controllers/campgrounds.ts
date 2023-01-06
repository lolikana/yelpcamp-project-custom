import { UploadApiResponse } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';

import { CampgroundModel } from '../models';

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
  campground.images = (req.files as UploadApiResponse).map((el: any) => ({
    url: el.path,
    filename: el.filename
  }));
  await campground.save();
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};

export const read = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const campground = await CampgroundModel.findById(id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('author');

  if (campground === null) {
    req.flash('error', 'Cannot find that campground');
    return res.redirect('/campgrounds');
    // next(new ExpressError('Campground not found', 404));
  }

  res.render(`campgrounds/detail`, { id, campground });
};

export const updateForm = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const campground = await CampgroundModel.findById(id);

  if (campground === null) {
    req.flash('error', 'Cannot find that campground to edit');
    return res.redirect('/campgrounds');
  }

  res.render('campgrounds/edit', { campground });
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

  if (campground === null) {
    req.flash('error', 'Cannot find that campground');
    return res.redirect('/campgrounds');
  }

  const imgs = (req.files as UploadApiResponse).map((el: any) => ({
    url: el.path,
    filename: el.filename
  }));
  campground.images.push(...imgs);
  await campground.save();
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
