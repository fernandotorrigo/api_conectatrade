module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("bairro", {
        cep: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        }
    });

    return User;
};
