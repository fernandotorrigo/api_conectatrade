module.exports = (sequelize, Sequelize) => {
    const company_person_registration = sequelize.define("company_person_registrations", {
        idec: {
            type: Sequelize.INTEGER
        },
        cnpj: {
            type: Sequelize.STRING
        },
        razao_social: {
            type: Sequelize.STRING
        },
        nome_fantasia: {
            type: Sequelize.STRING
        },
        cnae_principal: {
            type: Sequelize.STRING
        },
        cpf: {
            type: Sequelize.STRING
        },
        name_person: {
            type: Sequelize.STRING
        },
        telefone1: {
            type: Sequelize.STRING
        },
        telefone2: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING
        },
        faixa: {
            type: Sequelize.STRING
        },
        faturamento: {
            type: Sequelize.STRING
        }
    });

    return company_person_registration;
};
