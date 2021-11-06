/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook';
import passportGoogle from 'passport-google-oauth';

import db from '../models/index';

const User = db.users;

passport.serializeUser((user: typeof User, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User
    .findByPk(userId)
    .then((user: typeof User) => {
      done(null, user);
    }).catch((err: any) => {
      done(err, null);
    });
});

passport.use(
  new passportLocal.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: true,
    },
    (async (username: string, password: string, done: any) => {
      const user = await User.findOne({
        where: { email: username },
        include: ['activations'],
      });
      if (!user) {
        return done(null, false, { message: 'Email not found.' });
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        }
        return done(null, false, { message: 'Invalid email or password.' });
      });
    }),
  ),
);
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
passport.use(
  new passportFacebook.Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL as string,
    },
    (async (accessToken, refreshToken, profile, cb) => {
      console.log(profile.id);
      const [user, status] = await User.findOrCreate({
        where: {
          social_user_id: profile.id,
          name: profile.displayName,
          registration_type: 'facebook',
        },
      });
      cb(null, user);
    }),
  ),
);

passport.use(
  new passportGoogle.OAuthStrategy(
    {
      consumerKey: process.env.GOOGLE_CLIENT_ID as string,
      consumerSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_APP_CALLBACK_URL as string,
    },
    (async (accessToken, refreshToken, profile, cb) => {
      const [user, status] = await User.findOrCreate({
        where: {
          social_user_id: profile.id,
          name: profile.displayName,
          registration_type: 'google',
        },
      });
      cb(null, user);
    }),
  ),
);
