"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcryptjs_1 = (0, tslib_1.__importDefault)(require("bcryptjs"));
const index_1 = (0, tslib_1.__importDefault)(require("../models/index"));
const validator_1 = require("./validator");
const user_service_1 = (0, tslib_1.__importDefault)(require("../services/user.service"));
const User = index_1.default.users;
class UserController {
    constructor() {
        this.profile = (req, res) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { user } = req;
            res.render('pages/user/profile.ejs', { user });
        });
        this.update = (req, res) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userObject = req.user;
            const result = yield user_service_1.default.update(userObject.id, { name: req.body.name });
            if (!result.user) {
                req.flash('error', result.message);
                return res.redirect('/profile');
            }
            res.render('pages/user/profile.ejs', { user: result.user });
        });
        this.getResetPassword = (req, res) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { user } = req;
            res.render('pages/user/reset-password.ejs', { user, messages: req.flash('error') });
        });
        this.postResetPassword = (req, res) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userObject = req.user;
            const isValidRequest = (0, validator_1.validate)(req);
            if (!isValidRequest)
                return res.redirect('/reset-password');
            const hashed = yield bcryptjs_1.default.hash(req.body.newPassword, 10);
            const result = yield user_service_1.default.update(userObject.id, { password: hashed });
            if (!result.user) {
                req.flash('error', result.message);
                return res.redirect('/reset-password');
            }
            res.render('pages/user/reset-password.ejs', { user: result.user });
        });
    }
}
exports.default = UserController;
