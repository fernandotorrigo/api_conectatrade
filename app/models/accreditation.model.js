// const company_person_registration = require("./company_person_registration.model.js")(sequelize, Sequelize);


// // Accreditation.belongsTo(company_person_registration, {
// //     foreignKey: 'companyPersonRegistrationId',
// //     // as: 'Reporter'
// // });

module.exports = (sequelize, Sequelize) => {
    const Accreditation = sequelize.define("accreditations", {
        consultorId: {
            type: Sequelize.INTEGER,
            references: { model: 'Users', key: 'id' },
            allowNull: false,
            require: true
        },
        companyPersonRegistrationId: {
            type: Sequelize.INTEGER,
            references: { model: 'company_person_registrations', key: 'id' },
            allowNull: false,
            require: true
        },
        accreditationsStatusId: {
            type: Sequelize.INTEGER,
            references: { model: 'accreditations_statuses', key: 'id' },
            allowNull: false
        },
        typePerson: {
            type: Sequelize.ENUM('PJ', 'PF')
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
        habilitElo: {
            type: Sequelize.ENUM('N', 'S')
        },
        habilitHipercard: {
            type: Sequelize.ENUM('N', 'S')
        },
        antecRav: {
            type: Sequelize.ENUM('N', 'S')
        },
        antecAut: {
            type: Sequelize.ENUM('N', 'S')
        },
        monthlyBilling: {
            type: Sequelize.DECIMAL(10, 2)
        },
        mainActiveService: {
            type: Sequelize.STRING
        },
        visaMasterModDebV: {
            type: Sequelize.STRING
        },
        visaMasterModCredV: {
            type: Sequelize.STRING
        },
        visaMasterModCred2a6ParcSJuros: {
            type: Sequelize.STRING
        },
        visaMasterModCred7a12ParcSJuros: {
            type: Sequelize.STRING
        },
        EloModDebV: {
            type: Sequelize.STRING
        },
        EloModCredV: {
            type: Sequelize.STRING
        },
        EloModCred2a6ParcSJuros: {
            type: Sequelize.STRING
        },
        EloModCred7a12ParcSJuros: {
            type: Sequelize.STRING
        },
        HipercardModDebV: {
            type: Sequelize.STRING
        },
        HipercardModCredV: {
            type: Sequelize.STRING
        },
        HipercardModCred2a6ParcSJuros: {
            type: Sequelize.STRING
        },
        HipercardModCred7a12ParcSJuros: {
            type: Sequelize.STRING
        },
        sfFrenteECName: {
            type: Sequelize.STRING
        },
        sfFrenteECDataImage: {
            type: Sequelize.BLOB('long')
        },
        fotoAdesivoFrenteName: {
            type: Sequelize.STRING
        },
        fotoAdesivoFrenteDataImage: {
            type: Sequelize.BLOB('long')
        },
        fotoStopperForaName: {
            type: Sequelize.STRING
        },
        fotoStopperForaDataImage: {
            type: Sequelize.BLOB('long')
        },
        fotoBalcaoTrasacaoTesteName: {
            type: Sequelize.STRING
        },
        fotoBalcaoTrasacaoTesteDataImage: {
            type: Sequelize.BLOB('long')
        },
        fotoIdLojistaName: {
            type: Sequelize.STRING
        },
        fotoIdLojistaDataImage: {
            type: Sequelize.BLOB('long')
        },
        audioRecordName: {
            type: Sequelize.BLOB('long')
        }
    });

    return Accreditation;
};
