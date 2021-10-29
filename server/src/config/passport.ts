/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import passport from 'passport';

const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/index');

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: true,
      },
      (async (username: string, password: string, done: any) => {
        console.log(`trying to log in as ${username}`);
        const user = await User.findOne({ where: { email: username } });
        if (!user) {
          return done(null, false, { message: 'Invalid email.' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            console.log('successful login');
            return done(null, user);
          }
          return done(null, false, { message: 'Incorrect password.' });
        });
      }),
    ),
  );
};
