import { Request, Response } from 'express';
declare class UserController {
    profile: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    getResetPassword: (req: Request, res: Response) => Promise<void>;
    postResetPassword: (req: Request, res: Response) => Promise<void>;
}
export default UserController;
