const db = require("../../models");
const RevisitClient = db.revisit_client;
const Op = db.Sequelize.Op;
const User = db.user;
const companyPersonRegistration = db.company_person_registration;

exports.showRevisitClients = (req, res) => {
    const cnpj = req.query.cnpj;
    const razao_social = req.query.razao_social;
    const statusVisita = req.query.statusVisita;
    const dataIni = req.query.dataIni;
    const dataFim = req.query.dataFim;
    let whereRevisits = {};
    let whereEmpresa = {};

    if (cnpj && cnpj !== 'null') whereEmpresa.cnpj = { [Op.like]: '%' + cnpj + '%' }
    if (razao_social && razao_social !== 'null') whereEmpresa.razao_social = { [Op.like]: '%' + razao_social + '%' }
    if (dataIni && dataIni !== 'null') whereRevisits.createdAt = { [Op.between]: [dataIni, dataFim] }

    RevisitClient.findAll({
        include: [
            {
                model: User, attributes: ['nomeUsuario']
            },
            {
                model: companyPersonRegistration,
                where: whereEmpresa,
            },

        ],
        where: whereRevisits,
        order: [
            ['id', 'DESC']
        ],
    })
        .then(revisits => {
            res.status(200).send([{ revisits }]);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.showOneRevisit = (req, res) => {
    RevisitClient.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(revisit => {
            res.status(200).send([{ revisit }]);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.newRevisitClient = (req, res) => {
    RevisitClient.create({
        consultorId: req.body.consultorId || '',
        companyPersonRegistrationId: req.body.companyPersonRegistrationId || '',
        status_revisita: req.body.status_revisita || '',
        valor: req.body.valor || '',
        reason: req.body.reason || '',
        obs: req.body.obs || ''
    })
        .then(revisit => {
            res.send({ message: "Revisita registrada com sucesso" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

