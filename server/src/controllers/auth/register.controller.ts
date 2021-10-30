/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import {
  body, check, validationResult, CustomValidator,
} from 'express-validator';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import UserService from '../../services/user.service';

const { User } = require('../../models/index');

class RegisterController {
  public userService = new UserService();

  public getSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.user) {
      return res.redirect('/');
    }
    res.render('pages/signup.ejs');
  }

  public postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('hi');
    const isEmailExists: CustomValidator = (value) => User.findOne({ where: { email: value } })
      .then((existingUser: any) => {
        if (existingUser) {
          return Promise.reject('E-mail is already in use.');
        }
      });

    await check('name', 'Username must be at least 2 chars long.').isLength({ min: 2 }).run(req);
    await check('email', 'Email is not valid').isEmail().custom(isEmailExists).run(req);
    await check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req);
    await check('confirmPassword', 'Passwords do not match').equals(req.body.password).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash('errors', errors.array() as string[]);
      return res.redirect('/signup');
    }

    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      registration_type: 'email',
    });
    console.log(`created user is ${user.name}`);

    passport.authenticate('local', (err, userr, info) => {
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
  }

  public forgetPassword =
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.render('pages/reset-password.ejs');
  }

  public resetPassword =
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  }
}
export default RegisterController;
