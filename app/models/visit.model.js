module.exports = (sequelize, Sequelize) => {
    const Visit = sequelize.define("visits", {
        consultorId: {
            type: Sequelize.INTEGER,
            references: { model: 'Users', key: 'id' },
            allowNull: false,
            require: true
        },
        cnpj: {
            type: Sequelize.STRING
        },
        razao_social: {
            type: Sequelize.STRING
        },
        responsavel: {
            type: Sequelize.STRING
        },
        telefone: {
            type: Sequelize.STRING
        },
        cep: {
            type: Sequelize.STRING
        },
        enderecoCompany: {
            type: Sequelize.STRING
        },
        numeroCompany: {
            type: Sequelize.STRING
        },
        complementoCompany: {
            type: Sequelize.STRING
        },
        neighborhoodCompany: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        success: {
            type: Sequelize.ENUM('S', 'N')
        },
        reason: {
            type: Sequelize.STRING
        },
        obs: {
            type: Sequelize.TEXT
        }
    });

    return Visit;
};
