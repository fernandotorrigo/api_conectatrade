module.exports = (sequelize, Sequelize) => {
    const Accreditation = sequelize.define("accreditations", {
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

    return Accreditation;
};
