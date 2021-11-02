/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
import { Request, Response } from 'express';
import {
  body, check, validationResult, CustomValidator,
} from 'express-validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import ejs from 'ejs';
import path from 'path';

import db from '../../models/index';
import MailTrapTransport from '../../config/email.config';

const User = db.users;
const Activation = db.activations;

class RegisterController {
  public getSignup = async (req: Request, res: Response): Promise<void> => {
    if (req.user) {
      return res.redirect('/');
    }
    res.render('pages/signup.ejs', { data: req.flash() });
  }

  public postSignup = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const extractedErrors: any = [];
      errors.array().map((err) => extractedErrors.push(`${err.param} : ${err.msg}`));
      req.flash('error', extractedErrors);
      req.flash('oldInput', req.body);
      return res.redirect('/signup');
    }

    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      registration_type: 'email',
    });

    if (!user) {
      req.flash('error', 'Failed to create user, please try again');
      return res.redirect('/signup');
    }
    console.log(`created user is ${user.name}`);

    const activation = await Activation.create({
      user_id: user.id,
      code: crypto.randomBytes(20).toString('hex'),
      completed: false,
    });

    const MailOptions = await this.prepareMailOptions(req, user, activation);

    this.sendEmail(MailOptions, () => res.redirect('/')); // redirect to info page with
  }

  public forgetPassword =
    async (req: Request, res: Response): Promise<void> => {
      res.render('pages/reset-password.ejs');
    }

  public resetPassword =
    async (): Promise<void> => {
    }

  public validate = (method: string) => {
    switch (method) {
      case 'signup': {
        const isEmailExists: CustomValidator = (value) => User.findOne({ where: { email: value } })
          .then((existingUser: any) => {
            if (existingUser) {
              return Promise.reject('E-mail is already in use.');
            }
          });
        return [
          body('name', 'Username must be at least 2 chars long.').isLength({ min: 2 }),
          body('email', 'Email is not valid').isEmail().custom(isEmailExists),
          body('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
          body('confirmPassword', 'Passwords do not match').equals('password'),
        ];
      }
      default:
        return [];
    }
  }

  private prepareMailOptions = async (req: Request, user: any, activation: any) => {
    const link = `http://${req.headers.host}/activate/${user.id}/${activation.code}`;
    const data = await ejs.renderFile(path.join(__dirname, '../..', 'views/emails/verification.ejs'), { link, user });

    return {
      from: '"Eman Mohammed" <eman.cse2008@gmail.com>',
      to: req.body.email,
      subject: 'AVL Account verification',
      html: data,
    };
  }

  private sendEmail = (MailOptions: {}, callback: any) => {
    MailTrapTransport.sendMail(MailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Message sent: ${info.response}`);
        callback();
      }
    });
  }
}

export default RegisterController;
