/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
import {
  CustomValidator,
} from 'express-validator';

// import { body } from 'express-validator/check';
import db from '../models/index';

const User = db.users;

export const isEmailExists: CustomValidator = (value) => User.findOne({ where: { email: value } })
  .then((existingUser: any) => {
    if (existingUser) {
      return Promise.reject('E-mail is already in use.');
    }
  });

// eslint-disable-next-line no-unused-vars
const isOldPasswordCorrect: CustomValidator = (value) => User.findOne({ where: { email: value } })
  .then((existingUser: any) => {
    if (existingUser) {
      return Promise.reject('Old password is not correct.');
    }
  });

// export const vLogin = [
//   body('email', 'Email is not valid').isEmail(),
// ];

// export const vRegister = () => [
//   body('name', 'Username must be at least 2 chars long.').isLength({ min: 2 }),
//   body('email', 'Email is not valid').isEmail().custom(isEmailExists),
//   body('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
//   body('confirmPassword', 'Passwords do not match').matches('password'),
// ];

// export const vForgetPassword = [
//   body('email', 'Email is not valid').isEmail(),
// ];

// export const vResetPassword = () => [
//   body('oldPassword', 'Old password is not correct').custom(isOldPasswordCorrect),
//   body('newPassword', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
//   body('confirmNewPassword', 'Passwords do not match').equals('newPassword'),
// ];
