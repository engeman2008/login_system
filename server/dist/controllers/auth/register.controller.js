"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ejs_1 = (0, tslib_1.__importDefault)(require("ejs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const utils_1 = require("../../utils/utils");
const user_service_1 = (0, tslib_1.__importDefault)(require("../../services/user.service"));
const validator_1 = require("../validator");
const index_1 = (0, tslib_1.__importDefault)(require("../../models/index"));
const User = index_1.default.users;
const Activation = index_1.default.activations;
class RegisterController {
    constructor() {
        this.getSignup = (req, res) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (req.user) {
                return res.redirect('/');
            }
            const oldInput = req.flash('oldInput')[0];
            res.render('pages/signup.ejs', { messages: req.flash('error'), oldInput });
        });
        this.postSignup = (req, res) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const isValidRequest = (0, validator_1.validate)(req);
            if (!isValidRequest)
                return res.redirect('/signup');
            const result = yield user_service_1.default.newUser(req.body);
            if (!result.user) {
                req.flash('error', result.message);
                return res.redirect('/signup');
            }
            res.render('pages/user/welcome.ejs', { name: result.user.name });
            const MailOptions = yield this.prepareMail(req, result.user, result.activation);
            (0, utils_1.sendEmail)(MailOptions, () => { });
        });
        this.resendEmail = (req, res) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = req.user;
            console.log(user);
            const activation = yield Activation.findOne({
                where: { user_id: user.id },
            });
            res.render('pages/user/welcome.ejs', { name: user.name });
            const MailOptions = yield this.prepareMail(req, user, activation);
            (0, utils_1.sendEmail)(MailOptions, () => { });
        });
        this.prepareMail = (req, user, activation) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const link = `http://${req.headers.host}/activate/${user.id}/${activation.code}`;
            const data = yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../..', 'views/emails/verification.ejs'), { link, user });
            return {
                from: '"Eman Mohammed" <eman.cse2008@gmail.com>',
                to: user.email,
                subject: 'AVL Account verification',
                html: data,
            };
        });
    }
}
exports.default = RegisterController;
