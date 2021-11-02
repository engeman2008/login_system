/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
import { Request, Response } from 'express';
import {
  check, validationResult, CustomValidator,
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
    res.render('pages/signup.ejs', { messages: req.flash() });
  }

  public postSignup = async (req: Request, res: Response): Promise<void> => {
    const errors = await this.validateRequest(req);

    if (!errors.isEmpty()) {
      const extractedErrors: any = errors.array().map((err) => extractedErrors.push(`${err.param} : ${err.msg}`));
      req.flash('error', extractedErrors);
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

    const link = `http://${req.headers.host}/activate/${user.id}/${activation.code}`;

    const data = await ejs.renderFile(path.join(__dirname, '../..', 'views/emails/verification.ejs'), { link, user });

    const MailOptions = {
      from: '"Eman Mohammed" <eman.cse2008@gmail.com>',
      to: req.body.email,
      subject: 'AVL Account verification',
      html: data,
    };

    this.sendEmail(MailOptions, () => res.redirect('/')); // redirect to info page with
  }

  public forgetPassword =
    async (req: Request, res: Response): Promise<void> => {
      res.render('pages/reset-password.ejs');
    }

  public resetPassword =
    async (): Promise<void> => {
    }

  private validateRequest = async (req: Request) => {
    const isEmailExists: CustomValidator = (value) => User.findOne({ where: { email: value } })
      .then((existingUser: any) => {
        if (existingUser) {
          return Promise.reject('E-mail is already in use.');
        }
      });

    await check('name', 'Username must be at least 2 chars long.').isLength({ min: 2 }).run(req);
    await check('email', 'Email is not valid').isEmail().custom(isEmailExists).run(req);
    await check('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i').run(req);
    await check('confirmPassword', 'Passwords do not match').equals(req.body.password).run(req);

    return validationResult(req);
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
