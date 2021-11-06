"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.resetPasswordRules = exports.vRegisterRules = exports.isEmailExists = void 0;
const tslib_1 = require("tslib");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = (0, tslib_1.__importDefault)(require("bcryptjs"));
const index_1 = (0, tslib_1.__importDefault)(require("../models/index"));
const User = index_1.default.users;
const isEmailExists = (value) => User.findOne({ where: { email: value } })
    .then((existingUser) => {
    if (existingUser) {
        throw new Error('E-mail is already in use.');
    }
});
exports.isEmailExists = isEmailExists;
const vRegisterRules = () => [
    (0, express_validator_1.body)('name', 'Username must be at least 2 chars long.').isLength({ min: 2 }),
    (0, express_validator_1.body)('email', 'Email is not valid').isEmail().custom(exports.isEmailExists),
    (0, express_validator_1.body)('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
    (0, express_validator_1.body)('confirmPassword').custom((confirmPassword, { req }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const { password } = req.body;
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
    })),
];
exports.vRegisterRules = vRegisterRules;
const resetPasswordRules = () => [
    (0, express_validator_1.body)('oldPassword', 'Old password is not correct').custom((oldPassword, { req }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const { user } = req;
        const match = yield bcryptjs_1.default.compare(oldPassword, user.password);
        if (!match)
            throw new Error('Old Password is not correct');
    })),
    (0, express_validator_1.body)('newPassword', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
    (0, express_validator_1.body)('confirmNewPassword', 'Passwords do not match').custom((confirmNewPassword, { req }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const { newPassword } = req.body;
        console.log(newPassword);
        console.log(confirmNewPassword);
        if (newPassword !== confirmNewPassword) {
            throw new Error('Passwords do not match');
        }
    })),
];
exports.resetPasswordRules = resetPasswordRules;
const validate = (req) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty())
        return true;
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(`${err.param} : ${err.msg}`));
    req.flash('error', extractedErrors);
    req.flash('oldInput', req.body);
    return false;
};
exports.validate = validate;
