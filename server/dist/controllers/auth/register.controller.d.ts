import { Request, Response } from 'express';
declare class RegisterController {
    getSignup: (req: Request, res: Response) => Promise<void>;
    postSignup: (req: Request, res: Response) => Promise<void>;
    resendEmail: (req: Request, res: Response) => Promise<void>;
    private prepareMail;
}
export default RegisterController;
