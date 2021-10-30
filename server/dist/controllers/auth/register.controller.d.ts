import { NextFunction, Request, Response } from 'express';
import UserService from '../../services/user.service';
declare class RegisterController {
    userService: UserService;
    getSignup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    postSignup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    forgetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default RegisterController;
