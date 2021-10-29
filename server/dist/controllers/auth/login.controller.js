"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_service_1 = tslib_1.__importDefault(require("../../services/user.service"));
class LoginController {
    constructor() {
        this.userService = new user_service_1.default();
        this.getLogin = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/login.ejs');
        });
        this.postLogin = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(req.user);
            res.redirect('/dashboard');
            // passport.authenticate('local', { successRedirect: '/',
            // failureRedirect: '/login' , failureFlash: true}));
            // passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
            // passport.authenticate('local', { successFlash: 'Welcome!' });
        });
    }
}
exports.default = LoginController;
