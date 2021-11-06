import nodemailer from 'nodemailer';
declare const MailTrapTransport: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export default MailTrapTransport;
