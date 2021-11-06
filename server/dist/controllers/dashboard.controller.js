"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const { User } = require('../models/index');
class DashboardController {
    constructor() {
        this.index = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = req.user;
            res.render('pages/user/dashboard.ejs', { user });
        });
        this.welcome = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = req.user;
            res.render('pages/user/welcome.ejs', { name: user.name });
        });
    }
}
exports.default = DashboardController;
