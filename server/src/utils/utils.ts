import MailTrapTransport from '../config/email.config';

export const sendEmail = (MailOptions: {}, callback: any) => {
  MailTrapTransport.sendMail(MailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Message sent: ${info.response}`);
      callback();
    }
  });
};
