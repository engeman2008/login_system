"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const bcryptjs_1 = (0, tslib_1.__importDefault)(require("bcryptjs"));
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const passport_local_1 = (0, tslib_1.__importDefault)(require("passport-local"));
const passport_facebook_1 = (0, tslib_1.__importDefault)(require("passport-facebook"));
const passport_google_oauth_1 = (0, tslib_1.__importDefault)(require("passport-google-oauth"));
const index_1 = (0, tslib_1.__importDefault)(require("../models/index"));
const User = index_1.default.users;
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((userId, done) => {
    User
        .findByPk(userId)
        .then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err, null);
    });
});
passport_1.default.use(new passport_local_1.default.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
}, ((username, password, done) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        where: { email: username },
        include: ['activations'],
    });
    if (!user) {
        return done(null, false, { message: 'Email not found.' });
    }
    bcryptjs_1.default.compare(password, user.password, (err, res) => {
        if (res) {
            return done(null, user);
        }
        return done(null, false, { message: 'Invalid email or password.' });
    });
}))));
// passport.use(new passportFacebook.Strategy({
//   clientID: process.env.FACEBOOK_APP_ID as string,
//   clientSecret: process.env.FACEBOOK_APP_SECRET as string,
//   callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL as string,
// },
//   function (accessToken, refreshToken, profile, done) {
//     User.findOrCreate(..., function (err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));
console.log(process.env.FACEBOOK_APP_ID);
passport_1.default.use(new passport_facebook_1.default.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
}, ((accessToken, refreshToken, profile, cb) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const [user, status] = yield User.findOrCreate({
        where: {
            social_user_id: profile.id,
            name: profile.displayName,
            registration_type: 'facebook',
        },
    });
    cb(null, user);
}))));
passport_1.default.use(new passport_google_oauth_1.default.OAuthStrategy({
    consumerKey: process.env.GOOGLE_CLIENT_ID,
    consumerSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_APP_CALLBACK_URL,
}, ((accessToken, refreshToken, profile, cb) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const [user, status] = yield User.findOrCreate({
        where: {
            social_user_id: profile.id,
            name: profile.displayName,
            registration_type: 'google',
        },
    });
    cb(null, user);
}))));
