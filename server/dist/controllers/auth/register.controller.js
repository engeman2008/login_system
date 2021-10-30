"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_service_1 = tslib_1.__importDefault(require("../../services/user.service"));
class RegisterController {
    constructor() {
        this.userService = new user_service_1.default();
        this.getSignup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/signup.ejs');
        });
        this.postSignup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
        this.forgetPassword = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/reset-password.ejs');
        });
        this.resetPassword = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = RegisterController;
