const db = require("../../models");
const Accreditation = db.accreditation;
const companyPersonRegistration = db.company_person_registration;
const status = db.status;
const User = db.user;
const Op = db.Sequelize.Op;


exports.deleteAccreditation = (req, res) => {

    Accreditation.destroy({
        where: {
            id: req.query.idCredenciamento
        }
    }).then(rowDeleted => { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
            companyPersonRegistration.destroy({
                where: {
                    id: req.query.idEmpresa
                }
            }).then(rowDeleted => { // rowDeleted will return number of rows deleted
                res.status(200).send({ message: 'Credenciamento deletado com sucesso' });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        } else {
            res.status(200).send({ message: 'Nenhum credenciamento encontrado para deletar' });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.showAccreditations = async (req, res) => {

    const cnpj = req.query.cnpj;
    const idec = req.query.idec;
    const razao_social = req.query.razao_social;
    const id_status = req.query.id_status;
    const faixa = req.query.faixa;
    const dataIni = req.query.dataIni;
    const dataFim = req.query.dataFim;
    let whereCredenciamento = {};
    let whereEmpresa = {};

    if (cnpj && cnpj !== 'null') whereEmpresa.cnpj = { [Op.like]: '%' + cnpj + '%' }
    if (idec && idec !== 'null') whereEmpresa.idec = { [Op.like]: '%' + idec + '%' }
    if (razao_social && razao_social !== 'null') whereEmpresa.razao_social = { [Op.like]: '%' + razao_social + '%' }
    if (faixa && faixa !== 'null') whereEmpresa.faixa = { [Op.like]: '%' + faixa + '%' }
    console.log(123, dataFim)

    if (dataIni && dataIni !== 'null') whereCredenciamento.createdAt = { [Op.between]: [dataIni, dataFim + ' 23:59:59'] }
    if (id_status && id_status !== 'null') whereCredenciamento.accreditationsStatusId = { [Op.in]: [id_status] }

    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "consultor") {
                    Accreditation.findAll({
                        attributes: {
                            include: [
                                [db.sequelize.literal('(SELECT R.companyPersonRegistrationId FROM revisit_clients R where R.companyPersonRegistrationId = accreditations.companyPersonRegistrationId LIMIT 1)'), 'revisita'],
                            ]
                        },
                        include: [
                            {
                                model: companyPersonRegistration,
                                where: whereEmpresa,
                            },
                            {
                                model: status, attributes: ['name', 'color', 'blockedForConsultor']
                            }
                        ],
                        where: { consultorId: req.userId },
                        order: [
                            ['id', 'DESC']
                        ]
                    })
                        .then(accreditations => {
                            res.status(200).send([{ accreditations }]);
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });
                } else {
                    Accreditation.findAll({
                        attributes: {
                            include: [
                                [db.sequelize.literal('(SELECT R.companyPersonRegistrationId FROM revisit_clients R where R.companyPersonRegistrationId = accreditations.companyPersonRegistrationId LIMIT 1)'), 'revisita'],
                                [db.sequelize.literal('(SELECT B.nomeUsuario FROM users U INNER JOIN users B ON B.id = U.idBackoffice where U.id = accreditations.consultorId)'), 'nameBackoffice'],
                                [db.sequelize.literal('(SELECT N.name FROM users U INNER JOIN neighborhoods N ON N.id = U.idBairro where U.id = accreditations.consultorId)'), 'nameBairro'],
                            ]
                        },
                        include: [
                            {
                                model: companyPersonRegistration,
                                where: whereEmpresa,
                            },
                            {
                                model: User, attributes: ['nomeUsuario']
                            },
                            {
                                model: status, attributes: ['name', 'color', 'blockedForConsultor']
                            }
                        ],
                        where: whereCredenciamento,
                        order: [
                            ['id', 'DESC']
                        ]
                    })
                        .then(accreditations => {
                            res.status(200).send([{ accreditations }]);
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });

                }
            }
        }).catch(err => false);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};


exports.showAOneaccreditationsAdmin = async (req, res) => {
    Accreditation.findOne({
        include: [
            {
                model: companyPersonRegistration
            },
            {
                model: status, attributes: ['name', 'color', 'blockedForConsultor']
            }
        ],
        where: {
            id: req.params.id
        },
        order: [
            ['id', 'DESC']
        ]
    })
        .then(accreditations => {
            res.status(200).send([{ accreditations }]);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.showAccreditationsBackoffice = async (req, res) => {

    const cnpj = req.query.cnpj;
    const idec = req.query.idec;
    const razao_social = req.query.razao_social;
    const id_status = req.query.id_status;
    const faixa = req.query.faixa;
    const dataIni = req.query.dataIni;
    const dataFim = req.query.dataFim;
    let whereCredenciamento = {};
    let whereEmpresa = {};

    if (cnpj && cnpj !== 'null') whereEmpresa.cnpj = { [Op.like]: '%' + cnpj + '%' }
    if (idec && idec !== 'null') whereEmpresa.idec = { [Op.like]: '%' + idec + '%' }
    if (razao_social && razao_social !== 'null') whereEmpresa.razao_social = { [Op.like]: '%' + razao_social + '%' }
    if (faixa && faixa !== 'null') whereEmpresa.faixa = { [Op.like]: '%' + faixa + '%' }

    if (dataIni && dataIni !== 'null') whereCredenciamento.createdAt = { [Op.between]: [dataIni, dataFim + ' 23:59:59'] }
    if (id_status && id_status !== 'null') {
        if (Array.isArray(id_status)) {
            let arrayStatus = id_status.map(x => parseInt(x));
            whereCredenciamento.accreditationsStatusId = { [Op.in]: arrayStatus }

        } else {
            whereCredenciamento.accreditationsStatusId = { [Op.in]: [parseInt(id_status)] }
        }
    }

    User.findAll({
        attributes: ['id'],
        where: {
            idBackoffice: req.userId
        },
    }).then(user => {
        let arrayConsultors = []
        for (let i = 0; i < user.length; i++) {
            arrayConsultors.push(Number(user[i].id))
        }

        whereCredenciamento.consultorId = { [Op.or]: [arrayConsultors] }
        Accreditation.findAll({
            include: [
                {
                    model: companyPersonRegistration,
                    where: whereEmpresa,
                },
                {
                    model: User, attributes: ['nomeUsuario']
                },
                {
                    model: status, attributes: ['name', 'color', 'blockedForConsultor']
                }
            ],
            where: whereCredenciamento,
            order: [
                ['id', 'DESC']
            ]
        })
            .then(accreditations => {
                res.status(200).send([{ accreditations }]);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

}

exports.showAOneaccreditations = async (req, res) => {
    Accreditation.findOne({
        attributes: {
            include: [
                [db.sequelize.literal('(SELECT R.companyPersonRegistrationId FROM revisit_clients R where R.companyPersonRegistrationId = accreditations.companyPersonRegistrationId LIMIT 1)'), 'revisita']
            ]
        },
        include: [
            {
                model: companyPersonRegistration
            },
            {
                model: status, attributes: ['name', 'color', 'blockedForConsultor']
            }
        ],
        where: {
            id: req.params.id,
            // consultorId: req.userId
        },
        order: [
            ['id', 'DESC']
        ]
    })
        .then(accreditations => {
            res.status(200).send([{ accreditations }]);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.editAccreditation = (req, res) => {

    Accreditation.update({
        accreditationsStatusId: req.body.accreditationsStatusId,
        typePerson: req.body.typePerson,

        cep: req.body.cep,
        enderecoCompany: req.body.enderecoCompany,
        numeroCompany: req.body.numeroCompany,
        complementoCompany: req.body.complementoCompany,
        neighborhoodCompany: req.body.neighborhoodCompany,
        city: req.body.city,
        state: req.body.state,

        nome_banco: '',
        agencia: '',
        tipo_conta: '',
        numero_conta: '',
        monthlyBilling: req.body.monthlyBilling,
        mainActiveService: req.body.mainActiveService,

        visaModDebV: req.body.visaModDebV,
        visaModCredV: req.body.visaModCredV,
        visaModCred2a6ParcSJuros: req.body.visaModCred2a6ParcSJuros,
        visaModCred7a12ParcSJuros: req.body.visaModCred7a12ParcSJuros,
        masterModDebV: req.body.masterModDebV,
        masterModCredV: req.body.masterModCredV,
        masterModCred2a6ParcSJuros: req.body.masterModCred2a6ParcSJuros,
        masterModCred7a12ParcSJuros: req.body.masterModCred7a12ParcSJuros,

    }, {
        returning: true,
        where: {
            id: req.params.id
        }
    })
        .then(accreditation => {

            companyPersonRegistration.update({
                idec: req.body.idec,
                cnpj: req.body.cnpj,
                razao_social: req.body.razao_social,
                nome_fantasia: req.body.nome_fantasia,
                cnae_principal: req.body.cnae_principal,
                cpf: req.body.cpf,
                name_person: req.body.name_person,
                telefone1: req.body.telefone1,
                telefone2: req.body.telefone2,
                birthdate: req.body.birthdate,
                email: req.body.email
            }, {
                returning: true,
                where: {
                    id: req.body.companyPersonRegistrationId
                }
            })
                .then(dataCompanyPerson => {
                    res.status(200).send({ dataCompanyPerson, accreditation });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};

exports.editAccreditationAdmin = (req, res) => {

    Accreditation.update({
        accreditationsStatusId: req.body.accreditationsStatusId,
        typePerson: req.body.typePerson,

        cep: req.body.cep,
        enderecoCompany: req.body.enderecoCompany,
        numeroCompany: req.body.numeroCompany,
        complementoCompany: req.body.complementoCompany,
        neighborhoodCompany: req.body.neighborhoodCompany,
        city: req.body.city,
        state: req.body.state,

        nome_banco: '',
        agencia: '',
        tipo_conta: '',
        numero_conta: '',
        monthlyBilling: req.body.monthlyBilling,
        mainActiveService: req.body.mainActiveService,

        visaModDebV: req.body.visaModDebV,
        visaModCredV: req.body.visaModCredV,
        visaModCred2a6ParcSJuros: req.body.visaModCred2a6ParcSJuros,
        visaModCred7a12ParcSJuros: req.body.visaModCred7a12ParcSJuros,
        masterModDebV: req.body.masterModDebV,
        masterModCredV: req.body.masterModCredV,
        masterModCred2a6ParcSJuros: req.body.masterModCred2a6ParcSJuros,
        masterModCred7a12ParcSJuros: req.body.masterModCred7a12ParcSJuros,

        sfFrenteECName: req.body.sfFrenteECName || '',
        sfFrenteECDataImage: req.body.sfFrenteECDataImage || '',
        fotoAdesivoFrenteName: req.body.fotoAdesivoFrenteName || '',
        fotoAdesivoFrenteDataImage: req.body.fotoAdesivoFrenteDataImage || '',
        fotoStopperForaName: req.body.fotoStopperForaName || '',
        fotoStopperForaDataImage: req.body.fotoStopperForaDataImage || '',
        fotoBalcaoTrasacaoTesteName: req.body.fotoBalcaoTrasacaoTesteName || '',
        fotoBalcaoTrasacaoTesteDataImage: req.body.fotoBalcaoTrasacaoTesteDataImage || '',
        fotoIdLojistaName: req.body.fotoIdLojistaName || '',
        fotoIdLojistaDataImage: req.body.fotoIdLojistaDataImage || '',
        fotoBalcaoQROfertaName: req.body.fotoBalcaoQROfertaName || '',
        fotoBalcaoQROfertaDataImage: req.body.fotoBalcaoQROfertaDataImage || '',
        obs: req.body.obs || '',
        audioRecordName: req.body.audioRecordName || '',
    }, {
        returning: true,
        where: {
            id: req.params.id
        }
    })
        .then(accreditation => {

            companyPersonRegistration.update({
                idec: req.body.idec,
                cnpj: req.body.cnpj,
                razao_social: req.body.razao_social,
                nome_fantasia: req.body.nome_fantasia,
                cnae_principal: req.body.cnae_principal,
                cpf: req.body.cpf,
                name_person: req.body.name_person,
                telefone1: req.body.telefone1,
                telefone2: req.body.telefone2,
                email: req.body.email
            }, {
                returning: true,
                where: {
                    id: req.body.companyPersonRegistrationId
                }
            })
                .then(dataCompanyPerson => {
                    res.status(200).send({ dataCompanyPerson, accreditation });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};


exports.newAccreditation = (req, res) => {

    companyPersonRegistration.create({
        idec: req.body.idec || '',
        cnpj: req.body.cnpj || '',
        razao_social: req.body.razao_social || '',
        nome_fantasia: req.body.nome_fantasia || '',
        cnae_principal: req.body.cnae_principal || '',
        cpf: req.body.cpf || '',
        name_person: req.body.name_person || '',
        telefone1: req.body.telefone1 || '',
        telefone2: req.body.telefone2 || '',
        birthdate: req.body.birthdate || '',
        email: req.body.email || ''
    })
        .then(dataCompanyPerson => {
            Accreditation.create({
                consultorId: req.body.consultorId || '',
                companyPersonRegistrationId: dataCompanyPerson.id || '',
                accreditationsStatusId: req.body.accreditationsStatusId || '',
                typePerson: req.body.typePerson || '',

                cep: req.body.cep || '',
                enderecoCompany: req.body.enderecoCompany || '',
                numeroCompany: req.body.numeroCompany || '',
                complementoCompany: req.body.complementoCompany || '',
                neighborhoodCompany: req.body.neighborhoodCompany || '',
                city: req.body.city || '',
                state: req.body.state || '',

                nome_banco: '',
                agencia: '',
                tipo_conta: '',
                numero_conta: '',

                monthlyBilling: req.body.monthlyBilling || 0.00,
                mainActiveService: req.body.mainActiveService || 'PicPay',

                visaModDebV: req.body.visaModDebV || '',
                visaModCredV: req.body.visaModCredV || '',
                visaModCred2a6ParcSJuros: req.body.visaModCred2a6ParcSJuros || '',
                visaModCred7a12ParcSJuros: req.body.visaModCred7a12ParcSJuros || '',
                masterModDebV: req.body.masterModDebV || '',
                masterModCredV: req.body.masterModCredV || '',
                masterModCred2a6ParcSJuros: req.body.masterModCred2a6ParcSJuros || '',
                masterModCred7a12ParcSJuros: req.body.masterModCred7a12ParcSJuros || '',

                sfFrenteECName: req.body.sfFrenteECName || '',
                sfFrenteECDataImage: req.body.sfFrenteECDataImage || '',
                fotoAdesivoFrenteName: req.body.fotoAdesivoFrenteName || '',
                fotoAdesivoFrenteDataImage: req.body.fotoAdesivoFrenteDataImage || '',
                fotoStopperForaName: req.body.fotoStopperForaName || '',
                fotoStopperForaDataImage: req.body.fotoStopperForaDataImage || '',
                fotoBalcaoTrasacaoTesteName: req.body.fotoBalcaoTrasacaoTesteName || '',
                fotoBalcaoTrasacaoTesteDataImage: req.body.fotoBalcaoTrasacaoTesteDataImage || '',
                fotoIdLojistaName: req.body.fotoIdLojistaName || '',
                fotoIdLojistaDataImage: req.body.fotoIdLojistaDataImage || '',
                fotoBalcaoQROfertaName: req.body.fotoBalcaoQROfertaName || '',
                fotoBalcaoQROfertaDataImage: req.body.fotoBalcaoQROfertaDataImage || '',
            })
                .then(accreditation => {
                    res.status(200).send({ dataCompanyPerson, accreditation });
                })
                .catch(err => {
                    companyPersonRegistration.destroy({
                        where: {
                            id: dataCompanyPerson.id
                        }
                    })
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};
