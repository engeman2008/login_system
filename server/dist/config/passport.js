"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable consistent-return */
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/index');
exports.default = () => {
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
    }, ((username, password, done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        console.log(`trying to log in as ${username}`);
        const user = yield User.findOne({ where: { email: username } });
        if (!user) {
            return done(null, false, { message: 'Invalid email.' });
        }
        bcryptjs_1.default.compare(password, user.password, (err, res) => {
            if (res) {
                console.log('successful login');
                return done(null, user);
            }
            return done(null, false, { message: 'Incorrect password.' });
        });
    }))));
};
