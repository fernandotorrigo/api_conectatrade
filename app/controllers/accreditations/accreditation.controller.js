const db = require("../../models");
const Accreditation = db.accreditation;
const companyPersonRegistration = db.company_person_registration;

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
            }
        ]
    })
        .then(accreditations => {
            res.status(200).send({ accreditations });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
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
        cpf_cnpj: req.body.cpf_cnpj || '',
        name_person_razao_social: req.body.name_person_razao_social || '',
        apelido_nome_fantasia: req.body.apelido_nome_fantasia || '',
        telefone: req.body.telefone || '',
        birthdate: req.body.birthdate || '',
        cnae_principal: req.body.cnae_principal || '',
        email_company_person: req.body.email_company_person || '',
    })
        .then(dataCompanyPerson => {
            Accreditation.create({
                consultorId: req.body.consultorId || '',
                companyPersonRegistrationId: dataCompanyPerson.id || '',
                neighborhoodId: req.body.neighborhoodId || '',
                accreditationsStatusId: req.body.accreditationsStatusId || '',
                typePerson: req.body.typePerson || '',
                neighborhood: req.body.neighborhood || '',
                endereco: req.body.endereco || '',
                numero: req.body.numero || '',
                email: req.body.email || '',
                complemento: req.body.complemento || '',
                habilitElo: req.body.habilitElo || '',
                habilitHipercard: req.body.habilitHipercard || '',
                antecRav: req.body.antecRav || '',
                antecAut: req.body.antecAut || '',
                monthlyBilling: req.body.monthlyBilling || '',
                mainActiveService: req.body.mainActiveService || '',
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
                sfFrenteEC: req.body.sfFrenteEC || '',
                fotoAdesivoFrente: req.body.fotoAdesivoFrente || '',
                fotoStopperFora: req.body.fotoStopperFora || '',
                fotoBalcaoTrasacaoTeste: req.body.fotoBalcaoTrasacaoTeste || '',
                fotoIdLojista: req.body.fotoIdLojista || ''
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

