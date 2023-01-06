import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { ExpressError } from '../utils';

const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required()
  }).required()
});

export const validateCampground = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { error } = campgroundSchema.validate(req.body);
  if (error !== undefined) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  return next();
};

const reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
  }).required()
});

export const validateReview = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { error } = reviewSchema.validate(req.body);
  if (error !== undefined) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  return next();
};
