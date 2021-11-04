import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import db from '../models/index';

const User = db.users;
const Activation = db.activations;

class UserService {
  public static async newUser(userData: any) {
    const hashed = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashed,
      registration_type: 'email',
    });

    if (!user) {
      return { user: null, activation: null, message: 'Failed to create user, please try again' };
    }
    console.log(`created user is ${user.name}`);

    const activation = await Activation.create({
      user_id: user.id,
      code: crypto.randomBytes(20).toString('hex'),
      completed: false,
    });
    // if (!activation) {} should delete user
    return { user, activation, message: 'User Created' };
  }

  public static async update(userId: any, newData: any) {
    const user = await User.findByPk(userId);

    try {
      // await user.save();
      await user.update(newData);
    } catch (error) {
      if (!user) {
        return { user: null, message: 'Failed to update, please try again' };
      }
    }
    return { user, message: 'Updated' };
  }
}
export default UserService;
