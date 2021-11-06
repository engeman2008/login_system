"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = (0, tslib_1.__importDefault)(require("../models/index"));
const User = index_1.default.users;
const Activation = index_1.default.activations;
const isActivated = (req, res, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (req.path === '/send-verify-email' || req.path.includes('activate'))
        return next();
    if (!user)
        return next();
    const activation = yield Activation.findOne({
        where: { user_id: user.id },
    });
    if (activation && activation.completed)
        return next();
    return res.status(200).render('pages/user/welcome.ejs', { name: user.name });
});
exports.default = isActivated;
