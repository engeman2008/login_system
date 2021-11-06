"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodemailer_1 = (0, tslib_1.__importDefault)(require("nodemailer"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
dotenv_1.default.config();
const MailTrapTransport = nodemailer_1.default.createTransport({
    port: Number(process.env.MAILTRAP_PORT),
    host: String(process.env.MAILTRAP_HOST),
    auth: {
        user: process.env.MAILTRAP_AUTH_USER,
        pass: process.env.MAILTRAP_AUTH_PASS,
    },
});
exports.default = MailTrapTransport;
