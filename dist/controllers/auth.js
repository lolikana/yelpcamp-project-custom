"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.renderLogin = exports.register = exports.renderRegister = void 0;
const models_1 = require("../models");
const renderRegister = (_req, res) => {
    res.render('auth/register');
};
exports.renderRegister = renderRegister;
const register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = await new models_1.User({ email, username });
        const registeredUser = await models_1.User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err)
                return next(err);
            req.flash('success', 'Welcome to Yelp Camp');
            res.redirect('/campgrounds');
        });
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
};
exports.register = register;
const renderLogin = (_req, res) => {
    res.render('auth/login');
};
exports.renderLogin = renderLogin;
const login = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo !== undefined ? req.session.returnTo : '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};
exports.login = login;
const logout = (req, res) => {
    req.logout((err) => err !== undefined && console.log(err));
    req.flash('success', 'logout');
    res.redirect('/');
};
exports.logout = logout;
//# sourceMappingURL=auth.js.map