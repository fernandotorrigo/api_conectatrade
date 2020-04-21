module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("status", {
    name: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    blockedForConsultor: {
      type: Sequelize.INTEGER
    }
  });
  return User;
};
