"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const tslib_1 = require("tslib");
const email_config_1 = (0, tslib_1.__importDefault)(require("../config/email.config"));
const sendEmail = (MailOptions, callback) => {
    email_config_1.default.sendMail(MailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(`Message sent: ${info.response}`);
            callback();
        }
    });
};
exports.sendEmail = sendEmail;
