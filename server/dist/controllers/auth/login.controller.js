"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = tslib_1.__importDefault(require("passport"));
const user_service_1 = tslib_1.__importDefault(require("../../services/user.service"));
class LoginController {
    constructor() {
        this.userService = new user_service_1.default();
        this.getLogin = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isLoginFailed = typeof req.query.login_failed !== 'undefined';
            console.log(isLoginFailed);
            if (isLoginFailed) {
                req.flash('validation_errors', 'Login has failed.');
            }
            const messages = yield req.consumeFlash('validation_errors');
            console.log(messages);
            res.render('pages/login.ejs', {
                messages,
            });
        });
        this.postLogin = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('local', {
                failureRedirect: '/login?login_failed',
                successRedirect: '/dashboard',
                failureFlash: 'Invalid username or password.',
            })(req, res, next);
            // passport.authenticate('local', {
            //   failureRedirect: '/login?login_failed',
            //   successRedirect:
            // '/dashboard',
            //   failureFlash: 'Invalid username or password.',
            // });
            // res.redirect('/dashboard');
            // passport.authenticate('local', { successRedirect: '/',
            // failureRedirect: '/login' , failureFlash: true}));
            // passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
            // passport.authenticate('local', { successFlash: 'Welcome!' });
        });
        this.postLogout = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            req.logout();
            res.redirect('/login');
        });
    }
}
exports.default = LoginController;
