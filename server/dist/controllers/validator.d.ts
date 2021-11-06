import { CustomValidator } from 'express-validator';
import { Request } from 'express';
export declare const isEmailExists: CustomValidator;
export declare const vRegisterRules: () => import("express-validator").ValidationChain[];
export declare const resetPasswordRules: () => import("express-validator").ValidationChain[];
export declare const validate: (req: Request) => boolean;
