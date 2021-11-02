import { Sequelize, Dialect } from 'sequelize';
import dbConfig from '../config/db.config';

import userModel from './user.model';
import activationModel from './activation.model';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = userModel(sequelize, Sequelize);
db.activations = activationModel(sequelize, Sequelize);

db.users.hasMany(db.activations, { as: 'activations' });

db.activations.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user',
}); // ondelete cascase

export default db;
