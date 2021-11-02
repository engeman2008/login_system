export default (sequelize: any, Sequelize: any) => {
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
