"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = tslib_1.__importDefault(require("passport"));
const user_service_1 = tslib_1.__importDefault(require("../../services/user.service"));
class LoginController {
    constructor() {
        this.userService = new user_service_1.default();
        this.getLogin = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/login.ejs', { messages: req.flash() });
        });
        this.postLogin = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('local', {
                failureRedirect: '/login',
                successRedirect: '/dashboard',
                failureFlash: 'Invalid username or password.',
            })(req, res, next);
            // res.redirect('/dashboard');
        });
        this.postLogout = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            req.logout();
            res.redirect('/login');
        });
    }
}
exports.default = LoginController;
