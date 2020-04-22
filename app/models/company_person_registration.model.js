module.exports = (sequelize, Sequelize) => {
    const company_person_registration = sequelize.define("company_person_registrations", {
        idec: {
            type: Sequelize.INTEGER
        },
        cpf_cnpj: {
            type: Sequelize.STRING
        },
        name_person_razao_social: {
            type: Sequelize.STRING
        },
        apelido_nome_fantasia: {
            type: Sequelize.STRING
        },
        telefone: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATEONLY
        },
        cnae_principal: {
            type: Sequelize.STRING
        },
        email_company_person: {
            type: Sequelize.STRING
        }
    });

    return company_person_registration;
};
