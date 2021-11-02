"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const user_service_1 = tslib_1.__importDefault(require("../../services/user.service"));
const { User } = require('../../models/index');
class RegisterController {
    constructor() {
        this.userService = new user_service_1.default();
        this.getSignup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                return res.redirect('/');
            }
            res.render('pages/signup.ejs');
        });
        this.postSignup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('hi');
            const isEmailExists = (value) => User.findOne({ where: { email: value } })
                .then((existingUser) => {
                if (existingUser) {
                    return Promise.reject('E-mail is already in use.');
                }
            });
            yield express_validator_1.check('name', 'Username must be at least 2 chars long.').isLength({ min: 2 }).run(req);
            yield express_validator_1.check('email', 'Email is not valid').isEmail().custom(isEmailExists).run(req);
            yield express_validator_1.check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req);
            yield express_validator_1.check('confirmPassword', 'Passwords do not match').equals(req.body.password).run(req);
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.array());
                return res.redirect('/signup');
            }
            const hashed = yield bcryptjs_1.default.hash(req.body.password, 10);
            const user = yield User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashed,
                registration_type: 'email',
            });
            console.log(`created user is ${user.name}`);
            passport_1.default.authenticate('local', (err, userr, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/login');
                }
                req.logIn(user, (error) => {
                    if (error) {
                        return next(err);
                    }
                    return res.redirect('/');
                });
            })(req, res, next);
        });
        this.forgetPassword = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/reset-password.ejs');
        });
        this.resetPassword = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = RegisterController;
