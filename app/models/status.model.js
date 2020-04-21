module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("status", {
    name: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.INTEGER
    }
  });

  return User;
};
