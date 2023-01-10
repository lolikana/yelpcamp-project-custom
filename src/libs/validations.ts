import { NextFunction, Request, Response } from 'express';
import BaseJoi from 'joi';
import sanitizeHtml from 'sanitize-html';

import { ExpressError } from '../utils';

const extension = (joi: any): any => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!'
  },
  rules: {
    escapeHTML: {
      validate(value: any, helpers: any) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {}
        });
        if (clean !== value)
          return helpers.error('string.escapeHTML', { value });
        return clean;
      }
    }
  }
});

const Joi = BaseJoi.extend(extension);

const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
    price: Joi.number().min(0).required()
  }).required(),
  deleteImages: Joi.array()
});

export const validateCampground = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { error } = campgroundSchema.validate(req.body);
  if (error !== undefined) {
    const msg = error.details.map((el: any) => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  return next();
};

const reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required().escapeHTML(),
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
    const msg = error.details.map((el: any) => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  return next();
};
