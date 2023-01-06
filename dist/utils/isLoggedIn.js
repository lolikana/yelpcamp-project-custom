"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    return next();
};
exports.default = isLoggedIn;
//# sourceMappingURL=isLoggedIn.js.map