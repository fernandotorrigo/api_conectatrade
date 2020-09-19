module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define("accreditations_status", {
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
  return Status;
};
