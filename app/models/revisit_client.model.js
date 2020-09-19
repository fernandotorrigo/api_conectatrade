module.exports = (sequelize, Sequelize) => {
    const RevisitClient = sequelize.define("revisit client", {
        companyPersonRegistrationId: {
            type: Sequelize.INTEGER,
            references: { model: 'company_person_registrations', key: 'id' },
            allowNull: false,
            require: true
        },
        consultorId: {
            type: Sequelize.INTEGER,
            references: { model: 'Users', key: 'id' },
            allowNull: false,
            require: true
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

    return RevisitClient;
};
