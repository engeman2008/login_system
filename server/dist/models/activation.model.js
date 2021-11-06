"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const Activation = sequelize.define('activations', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        code: {
            type: Sequelize.STRING,
        },
        completed: {
            type: Sequelize.BOOLEAN,
            default: false,
        },
        completed_at: {
            type: Sequelize.DATE,
        },
    });
    return Activation;
};
