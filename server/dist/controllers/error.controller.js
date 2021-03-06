"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class ErrorController {
    constructor() {
        this.get404 = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            res.status(404).render('errors/404');
        });
        this.get500 = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            res.status(404).render('errors/error');
        });
    }
}
exports.default = ErrorController;
