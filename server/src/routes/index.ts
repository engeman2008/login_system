import { Router } from 'express';
import connectEnsureLogin from 'connect-ensure-login';

import LoginController from '../controllers/auth/login.controller';
import RegisterController from '../controllers/auth/register.controller';
import ActivateController from '../controllers/auth/activate.controller';
import DashboardController from '../controllers/dashboard.controller';
import ErrorController from '../controllers/error.controller';

const router = Router();

const loginController = new LoginController();
const registerController = new RegisterController();
const activateController = new ActivateController();
const dashboardController = new DashboardController();
const errorController = new ErrorController();

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
router.post('/signup', registerController.validate('signup'), registerController.postSignup);

router.get('/logout', loginController.postLogout);

router.get('/activate/:userId/:activationCode', activateController.activate);

router.get('/forget-password', registerController.forgetPassword);
router.post('/reset-password', registerController.resetPassword);

router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), dashboardController.index);

export default router;
