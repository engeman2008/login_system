import { Router } from 'express';
import connectEnsureLogin from 'connect-ensure-login';

import LoginController from '../controllers/auth/login.controller';
import RegisterController from '../controllers/auth/register.controller';

import DashboardController from '../controllers/dashboard.controller';

const router = Router();

const loginController = new LoginController();
const registerController = new RegisterController();

const dashboardController = new DashboardController();

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

router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), dashboardController.index);

export default router;
