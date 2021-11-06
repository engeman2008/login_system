import { NextFunction, Request, Response } from 'express';
declare class LoginController {
    getLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    postLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getFacebookLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    handleFacebookLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getGoogleLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    handleGoogleLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    postLogout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default LoginController;
