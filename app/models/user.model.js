module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    cpf: {
      type: Sequelize.STRING
    },
    admissionDate: {
      type: Sequelize.STRING
    },
    demissionDate: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    backoffice: {
      type: Sequelize.STRING
    },
    neighborhood: {
      type: Sequelize.STRING
    },
    endereco: {
      type: Sequelize.STRING
    },
    numero: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    complemento: {
      type: Sequelize.STRING
    },
    telefone: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
