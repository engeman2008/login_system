"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcryptjs_1 = (0, tslib_1.__importDefault)(require("bcryptjs"));
const crypto_1 = (0, tslib_1.__importDefault)(require("crypto"));
const index_1 = (0, tslib_1.__importDefault)(require("../models/index"));
const User = index_1.default.users;
const Activation = index_1.default.activations;
class UserService {
    static newUser(userData) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const hashed = yield bcryptjs_1.default.hash(userData.password, 10);
            const user = yield User.create({
                name: userData.name,
                email: userData.email,
                password: hashed,
                registration_type: 'email',
            });
            if (!user) {
                return { user: null, activation: null, message: 'Failed to create user, please try again' };
            }
            console.log(`created user is ${user.name}`);
            const activation = yield Activation.create({
                user_id: user.id,
                code: crypto_1.default.randomBytes(20).toString('hex'),
                completed: false,
            });
            // if (!activation) {} should delete user
            return { user, activation, message: 'User Created' };
        });
    }
    static update(userId, newData) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield User.findByPk(userId);
            try {
                // await user.save();
                yield user.update(newData);
            }
            catch (error) {
                if (!user) {
                    return { user: null, message: 'Failed to update, please try again' };
                }
            }
            return { user, message: 'Updated' };
        });
    }
}
exports.default = UserService;
