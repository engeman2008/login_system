"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const { User } = require('../models/index');
class DashboardController {
    constructor() {
        this.index = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            res.send(`Hello ${user.name}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/secret">Members Only</a>`);
        });
    }
}
exports.default = DashboardController;
