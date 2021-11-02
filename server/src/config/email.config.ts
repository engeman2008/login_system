import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const MailTrapTransport = nodemailer.createTransport({
  port: Number(process.env.MAILTRAP_PORT),
  host: String(process.env.MAILTRAP_HOST),
  auth: {
    user: process.env.MAILTRAP_AUTH_USER,
    pass: process.env.MAILTRAP_AUTH_PASS,
  },
});

export default MailTrapTransport;
