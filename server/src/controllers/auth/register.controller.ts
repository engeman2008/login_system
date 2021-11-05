/* eslint-disable consistent-return */
import { Request, Response } from 'express';

import ejs from 'ejs';
import path from 'path';

import { sendEmail } from '../../utils/utils';
import UserService from '../../services/user.service';
import { validate } from '../validator';

import db from '../../models/index';

const User = db.users;
const Activation = db.activations;

class RegisterController {
  public getSignup = async (req: Request, res: Response): Promise<void> => {
    if (req.user) {
      return res.redirect('/');
    }
    const oldInput = req.flash('oldInput')[0];
    res.render('pages/signup.ejs', { messages: req.flash('error'), oldInput });
  }

  public postSignup = async (req: Request, res: Response): Promise<void> => {
    const isValidRequest = validate(req);
    if (!isValidRequest) return res.redirect('/signup');

    const result = await UserService.newUser(req.body);
    if (!result.user) {
      req.flash('error', result.message);
      return res.redirect('/signup');
    }
    res.render('pages/user/welcome.ejs', { name: result.user.name });

    const MailOptions = await this.prepareMail(req, result.user, result.activation);
    sendEmail(MailOptions, () => {});
  }

  public resendEmail = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as typeof User;
    console.log(user);
    const activation = await Activation.findOne({
      where: { user_id: user.id },
    });
    res.render('pages/user/welcome.ejs', { name: user.name });

    const MailOptions = await this.prepareMail(req, user, activation);
    sendEmail(MailOptions, () => {});
  }

  private prepareMail = async (req: Request, user: any, activation: any) => {
    const link = `http://${req.headers.host}/activate/${user.id}/${activation.code}`;
    const data = await ejs.renderFile(path.join(__dirname, '../..', 'views/emails/verification.ejs'), { link, user });

    return {
      from: '"Eman Mohammed" <eman.cse2008@gmail.com>',
      to: user.email,
      subject: 'AVL Account verification',
      html: data,
    };
  }
}

export default RegisterController;
