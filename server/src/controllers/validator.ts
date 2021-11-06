import {
  body, CustomValidator, validationResult,
} from 'express-validator';
import { Request } from 'express';
import bcrypt from 'bcryptjs';

import db from '../models/index';

const User = db.users;

export const isEmailExists: CustomValidator = (value) => User.findOne({ where: { email: value } })
  .then((existingUser: any) => {
    if (existingUser) {
      throw new Error('E-mail is already in use.');
    }
  });

export const vRegisterRules = () => [
  body('name', 'Username must be at least 2 chars long.').isLength({ min: 2 }),
  body('email', 'Email is not valid').isEmail().custom(isEmailExists),
  body('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
  body('confirmPassword').custom(async (confirmPassword, { req }) => {
    const { password } = req.body;
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
  }),
];

export const resetPasswordRules = () => [
  body('oldPassword', 'Old password is not correct').custom(async (oldPassword, { req }) => {
    const { user } = req;
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) throw new Error('Old Password is not correct');
  }),
  body('newPassword', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
  body('confirmNewPassword', 'Passwords do not match').custom(async (confirmNewPassword, { req }) => {
    const { newPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      throw new Error('Passwords do not match');
    }
  }),
];

export const validate = (req: Request) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return true;
  const extractedErrors: any = [];

  errors.array().map((err) => extractedErrors.push(`${err.param} : ${err.msg}`));
  req.flash('error', extractedErrors);
  req.flash('oldInput', req.body);

  return false;
};
