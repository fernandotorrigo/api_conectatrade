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
        nome_banco: {
            type: Sequelize.STRING
        },
        agencia: {
            type: Sequelize.STRING
        },
        tipo_conta: {
            type: Sequelize.STRING
        },
        numero_conta: {
            type: Sequelize.STRING
        },
        monthlyBilling: {
            type: Sequelize.STRING
        },
        mainActiveService: {
            type: Sequelize.STRING
        },
        visaModDebV: {
            type: Sequelize.STRING
        },
        visaModCredV: {
            type: Sequelize.STRING
        },
        visaModCred2a6ParcSJuros: {
            type: Sequelize.STRING
        },
        visaModCred7a12ParcSJuros: {
            type: Sequelize.STRING
        },
        masterModDebV: {
            type: Sequelize.STRING
        },
        masterModCredV: {
            type: Sequelize.STRING
        },
        masterModCred2a6ParcSJuros: {
            type: Sequelize.STRING
        },
        masterModCred7a12ParcSJuros: {
            type: Sequelize.STRING
        },
        sfFrenteECName: {
            type: Sequelize.STRING
        },
        sfFrenteECDataImage: {
            type: Sequelize.STRING
        },
        fotoAdesivoFrenteName: {
            type: Sequelize.STRING
        },
        fotoAdesivoFrenteDataImage: {
            type: Sequelize.STRING
        },
        fotoStopperForaName: {
            type: Sequelize.STRING
        },
        fotoStopperForaDataImage: {
            type: Sequelize.STRING
        },
        fotoBalcaoQROfertaName: {
            type: Sequelize.STRING
        },
        fotoBalcaoQROfertaDataImage: {
            type: Sequelize.STRING
        },
        fotoBalcaoTrasacaoTesteName: {
            type: Sequelize.STRING
        },
        fotoBalcaoTrasacaoTesteDataImage: {
            type: Sequelize.STRING
        },
        fotoIdLojistaName: {
            type: Sequelize.STRING
        },
        fotoIdLojistaDataImage: {
            type: Sequelize.STRING
        },
        audioRecordName: {
            type: Sequelize.STRING
        },
        obs: {
            type: Sequelize.TEXT
        }
    });

    return Accreditation;
};
