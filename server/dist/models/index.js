"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const db_config_1 = tslib_1.__importDefault(require("../config/db.config"));
const user_model_1 = tslib_1.__importDefault(require("./user.model"));
const sequelize = new sequelize_1.Sequelize(db_config_1.default.DB, db_config_1.default.USER, db_config_1.default.PASSWORD, {
    host: db_config_1.default.HOST,
    dialect: db_config_1.default.dialect,
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.users = user_model_1.default(sequelize, sequelize_1.Sequelize);
exports.default = db;
