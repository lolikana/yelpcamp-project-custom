import { Router } from 'express';
import passport from 'passport';

import { User } from '../models/user';
import { catchAsync } from '../utils/catchAsync';

export const router = Router();

router.get('/register', (_req, res) => {
  res.render('auth/register');
});

router.post(
  '/register',
  catchAsync(async (req, res, next) => {
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
  })
);

router.get('/login', (_req, res) => {
  res.render('auth/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    keepSessionInfo: true
  }),
  (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl =
      req.session.returnTo !== undefined
        ? req.session.returnTo
        : '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

router.get('/logout', (req, res) => {
  req.logout((err: unknown) => console.log(err));
  req.flash('success', 'logout');
  res.redirect('/campgrounds');
});
