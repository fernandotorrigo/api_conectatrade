module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    cpf: {
      type: Sequelize.STRING
    },
    dataAdmissao: {
      type: Sequelize.STRING
    },
    dataDemissao: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    nomeUsuario: {
      type: Sequelize.STRING
    },
    idBackoffice: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      allowNull: true,
      require: true
  },
    idBairro: {
      type: Sequelize.INTEGER,
      references: { model: 'neighborhoods', key: 'id' },
      allowNull: true,
      require: true
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
