"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
class LoginController {
    constructor() {
        this.getLogin = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            res.render('pages/login.ejs', { messages: req.flash('error') });
        });
        this.postLogin = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            passport_1.default.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
                req.logIn(user, (error) => {
                    if (error) {
                        return next(error);
                    }
                    return res.redirect('dashboard');
                });
            })(req, res, next);
        });
        this.getFacebookLogin = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log('here');
            passport_1.default.authenticate('facebook');
        });
        this.handleFacebookLogin = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            passport_1.default.authenticate('facebook', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
                req.logIn(user, (error) => {
                    if (error) {
                        return next(error);
                    }
                    return res.redirect('dashboard');
                });
            })(req, res, next);
        });
        this.getGoogleLogin = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log('google');
            passport_1.default.authenticate('google', { scope: 'https://www.google.com/m8/feeds' });
        });
        this.handleGoogleLogin = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            passport_1.default.authenticate('google', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
                req.logIn(user, (error) => {
                    if (error) {
                        return next(error);
                    }
                    return res.redirect('dashboard');
                });
            })(req, res, next);
        });
        this.postLogout = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            req.logout();
            res.redirect('/login');
        });
    }
}
exports.default = LoginController;
