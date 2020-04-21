module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("status", {
    name: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
