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
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = await new User({ email, username });
      const registeredUser = await User.register(user, password);
      console.log(registeredUser);
      req.flash('success', 'Welcome to Yelp Camp');
      res.redirect('/campgrounds');
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
    failureRedirect: '/login'
  }),
  (req, res) => {
    req.flash('success', 'Welcome back');
    res.redirect('/campgrounds');
  }
);
