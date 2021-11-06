"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const db_config_1 = (0, tslib_1.__importDefault)(require("../config/db.config"));
const user_model_1 = (0, tslib_1.__importDefault)(require("./user.model"));
const activation_model_1 = (0, tslib_1.__importDefault)(require("./activation.model"));
const sequelize = new sequelize_1.Sequelize(db_config_1.default.DB, db_config_1.default.USER, db_config_1.default.PASSWORD, {
    host: db_config_1.default.HOST,
    dialect: db_config_1.default.dialect,
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.users = (0, user_model_1.default)(sequelize, sequelize_1.Sequelize);
db.activations = (0, activation_model_1.default)(sequelize, sequelize_1.Sequelize);
db.users.hasMany(db.activations, { as: 'activations' });
db.activations.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user',
}); // ondelete cascase
exports.default = db;
