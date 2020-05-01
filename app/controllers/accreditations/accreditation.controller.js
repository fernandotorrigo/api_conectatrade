const db = require("../../models");
const Accreditation = db.accreditation;
const companyPersonRegistration = db.company_person_registration;
const status = db.status;
const User = db.user;


exports.deleteAccreditation = (req, res) => {

    Accreditation.destroy({
        where: {
            id: req.query.id
        }
    }).then(rowDeleted => { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
            res.status(200).send({ message: 'Credenciamento deletado com sucesso' });
        } else {
            res.status(200).send({ message: 'Nenhum credenciamento encontrado para deletar' });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.showAccreditations = (req, res) => {

    Accreditation.findAll({
        include: [
            {
                model: companyPersonRegistration
            },
            {
                model: status, attributes: ['name', 'color', 'blockedForConsultor']
            }
        ],
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
};

exports.showAccreditations = async (req, res) => {

    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "consultor") {
                    Accreditation.findAll({
                        include: [
                            {
                                model: companyPersonRegistration
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
                        include: [
                            {
                                model: companyPersonRegistration
                            },
                            {
                                model: User, attributes: ['nomeUsuario']
                            },
                            {
                                model: status, attributes: ['name', 'color', 'blockedForConsultor']
                            }
                        ],
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
    });
};

exports.editAccreditation = (req, res) => {
    // Accreditation
    Accreditation.update(
        {
            cep: req.body.cep,
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
        }, {
        returning: true,
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data[1] !== 0) {
                res.status(200).send({
                    message: 'Credenciamento editado com sucesso'
                });
            } else {
                res.status(500).send({ message: "Erro ao editar accreditation" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
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
        telefone1: req.body.telefone1 || '',
        telefone1: req.body.telefone1 || '',
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

                habilitElo: req.body.habilitElo || 'N',
                habilitHipercard: req.body.habilitHipercard || 'N',
                antecRav: req.body.antecRav || 'N',
                antecAut: req.body.antecAut || 'N',
                monthlyBilling: req.body.monthlyBilling || 0.00,
                mainActiveService: req.body.mainActiveService || 'PicPay',

                visaMasterModDebV: req.body.visaMasterModDebV || '',
                visaMasterModCredV: req.body.visaMasterModCredV || '',
                visaMasterModCred2a6ParcSJuros: req.body.visaMasterModCred2a6ParcSJuros || '',
                visaMasterModCred7a12ParcSJuros: req.body.visaMasterModCred7a12ParcSJuros || '',
                EloModDebV: req.body.EloModDebV || '',
                EloModCredV: req.body.EloModCredV || '',
                EloModCred2a6ParcSJuros: req.body.EloModCred2a6ParcSJuros || '',
                EloModCred7a12ParcSJuros: req.body.EloModCred7a12ParcSJuros || '',
                HipercardModDebV: req.body.HipercardModDebV || '',
                HipercardModCredV: req.body.HipercardModCredV || '',
                HipercardModCred2a6ParcSJuros: req.body.HipercardModCred2a6ParcSJuros || '',
                HipercardModCred7a12ParcSJuros: req.body.HipercardModCred7a12ParcSJuros || '',

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

