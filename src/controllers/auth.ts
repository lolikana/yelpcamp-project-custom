import { NextFunction, Request, Response } from 'express';

import { User } from '../models';

export const renderRegister = (_req: Request, res: Response): void => {
  res.render('auth/register');
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, username, password } = req.body;
    const user = await new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err: any) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (err) return next(err);
      req.flash('success', 'Welcome to Yelp Camp');
      res.redirect('/campgrounds');
    });
  } catch (err: any) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
};

export const renderLogin = (_req: Request, res: Response): void => {
  res.render('auth/login');
};

export const login = (req: Request, res: Response): void => {
  req.flash('success', 'Welcome back');
  const redirectUrl =
    req.session.returnTo !== undefined ? req.session.returnTo : '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

export const logout = (req: Request, res: Response): void => {
  req.logout((err: unknown) => err !== undefined && console.log(err));
  req.flash('success', 'logout');
  res.redirect('/campgrounds');
};
