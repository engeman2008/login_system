"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        social_user_id: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        registration_type: {
            type: Sequelize.ENUM('email', 'google', 'facebook'),
            defaultValue: 'email',
        },
    });
    return User;
};
