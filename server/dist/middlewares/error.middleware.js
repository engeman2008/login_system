"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    return res.render('errors/error', { error: err });
};
exports.default = errorMiddleware;
