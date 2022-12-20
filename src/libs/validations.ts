import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { ExpressError } from '../utils/ExpressError';

export const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().required()
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
