export default (sequelize: any, Sequelize: any) => {
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
