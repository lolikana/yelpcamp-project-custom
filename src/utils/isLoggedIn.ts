import { NextFunction, Request, Response } from 'express';

const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in');
    res.redirect('/login');
  }
  next();
};

export default isLoggedIn;
