import { Router } from 'express';
import connectEnsureLogin from 'connect-ensure-login';

import LoginController from '../controllers/auth/login.controller';
import RegisterController from '../controllers/auth/register.controller';
import ActivateController from '../controllers/auth/activate.controller';
import PasswordController from '../controllers/auth/password.controller';

import DashboardController from '../controllers/dashboard.controller';
import ErrorController from '../controllers/error.controller';
import UserController from '../controllers/user.controller';

const router = Router();

const loginController = new LoginController();
const registerController = new RegisterController();
const activateController = new ActivateController();
const passwordController = new PasswordController();
const dashboardController = new DashboardController();
const errorController = new ErrorController();
const userController = new UserController();

router.get('/', (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  return res.redirect('/login');
});

router.get('/404', errorController.get404);
router.get('/500', errorController.get500);

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

router.get('/signup', registerController.getSignup);
router.post('/signup', registerController.postSignup);

router.get('/logout', loginController.postLogout);
router.get('/activate/:userId/:activationCode', activateController.activate);

router.get('/forget-password', passwordController.forgetPassword);
router.post('/reset-password', passwordController.resetPassword);

router.get('/send-verify-email', connectEnsureLogin.ensureLoggedIn(), registerController.resendEmail);
router.get('/welcome', connectEnsureLogin.ensureLoggedIn(), dashboardController.welcome);
router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), dashboardController.index);
router.get('/profile', connectEnsureLogin.ensureLoggedIn(), userController.profile);
router.post('/profile', connectEnsureLogin.ensureLoggedIn(), userController.update);

export default router;
