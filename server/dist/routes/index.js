"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const connect_ensure_login_1 = tslib_1.__importDefault(require("connect-ensure-login"));
const login_controller_1 = tslib_1.__importDefault(require("../controllers/auth/login.controller"));
const register_controller_1 = tslib_1.__importDefault(require("../controllers/auth/register.controller"));
const dashboard_controller_1 = tslib_1.__importDefault(require("../controllers/dashboard.controller"));
const router = express_1.Router();
const loginController = new login_controller_1.default();
const registerController = new register_controller_1.default();
const dashboardController = new dashboard_controller_1.default();
router.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/dashboard');
    }
    res.redirect('/login');
});
router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);
router.get('/signup', registerController.getSignup);
router.post('/signup', registerController.postSignup);
router.get('/forget-password', registerController.forgetPassword);
router.post('/reset-password', registerController.resetPassword);
router.get('/logout', loginController.postLogout);
router.get('/dashboard', connect_ensure_login_1.default.ensureLoggedIn(), dashboardController.index);
exports.default = router;
