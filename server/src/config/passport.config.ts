/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import passport from 'passport';
import passportLocal from 'passport-local';

import db from '../models/index';

const User = db.users;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
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
        return done(null, false, { message: `Email ${username} not found.` });
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
