import { NextFunction, Request, Response } from 'express';
import UserService from '../../services/user.service';
declare class LoginController {
    userService: UserService;
    getLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    postLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default LoginController;
