"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const index_1 = (0, tslib_1.__importDefault)(require("../../models/index"));
const User = index_1.default.users;
const Activation = index_1.default.activations;
class ActivateController {
    constructor() {
        this.activate = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { userId, activationCode } = req.params;
            const user = yield User.findByPk(userId);
            if (!user) {
                next('User not found');
            }
            const activation = yield Activation.findOne({ where: { user_id: userId, code: activationCode } });
            if (!activation) {
                next('We were unable to find a user for this token.');
            }
            if (activation.completed) {
                next('This user has already been verified.');
            }
            try {
                activation.completed = true;
                activation.completed_at = Date.now();
                yield activation.save();
                console.log(`updated record ${JSON.stringify(activation, null, 2)}`);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
            console.log('The account has been verified. Please log in.');
            passport_1.default.authenticate('local', (err, userr, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/login');
                }
                req.logIn(user, (error) => {
                    if (error) {
                        return next(err);
                    }
                    return res.redirect('/');
                });
            })(req, res, next);
        });
    }
}
exports.default = ActivateController;
