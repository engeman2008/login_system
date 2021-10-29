"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const connect_ensure_login_1 = tslib_1.__importDefault(require("connect-ensure-login"));
const login_controller_1 = tslib_1.__importDefault(require("../controllers/auth/login.controller"));
const dashboard_controller_1 = tslib_1.__importDefault(require("../controllers/dashboard.controller"));
const router = express_1.Router();
const loginController = new login_controller_1.default();
const dashboardController = new dashboard_controller_1.default();
router.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/dashboard');
    }
    res.render('pages/index.ejs', {
        user: req.user,
    });
});
router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);
router.get('/dashboard', connect_ensure_login_1.default.ensureLoggedIn(), dashboardController.index);
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});
// // Creates a model by sending it's JSON and returns the id
// router.post('/create-model', modelController.createModel);
// // app.post('/create-model', modelController.createModel);
// // Accepts changes to the model via 'deltas')
// router.post('/model/:modelId/deltas', modelController.modelDeltas);
exports.default = router;
