const db = require("../../models");
const Visit = db.visit;
const Op = db.Sequelize.Op;
const User = db.user;

// exports.deleteNeighborhood = (req, res) => {

//     Neighborhood.destroy({
//         where: {
//             id: req.query.id
//         }
//     }).then(rowDeleted => { // rowDeleted will return number of rows deleted
//         if (rowDeleted === 1) {
//             res.status(200).send({ message: 'Bairro deletado com sucesso' });
//         } else {
//             res.status(200).send({ message: 'Nenhum bairro encontrado para deletar' });
//         }
//     }).catch(err => {
//         res.status(500).send({ message: err.message });
//     });
// };

exports.showVisits = (req, res) => {
    const cnpj = req.query.cnpj;
    const razao_social = req.query.razao_social;
    const statusVisita = req.query.statusVisita;
    const dataIni = req.query.dataIni;
    const dataFim = req.query.dataFim;
    let whereVisits = {};

    if (cnpj && cnpj !== 'null') whereVisits.cnpj = { [Op.like]: '%' + cnpj + '%' }
    if (razao_social && razao_social !== 'null') whereVisits.razao_social = { [Op.like]: '%' + razao_social + '%' }
    if (dataIni && dataIni !== 'null') whereVisits.createdAt = { [Op.between]: [dataIni, dataFim] }

    Visit.findAll({
        include: [
            {
                model: User, attributes: ['nomeUsuario']
            },

        ],
        where: whereVisits,
        order: [
            ['id', 'DESC']
        ],
    })
        .then(visits => {
            res.status(200).send([{ visits }]);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.showOneVisit = (req, res) => {
    Visit.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(visits => {
            res.status(200).send([{ visits }]);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// exports.editNeighborhood = (req, res) => {
//     // Neighborhood
//     Neighborhood.update(
//         {
//             cep: req.body.cep,
//             name: req.body.name,
//             city: req.body.city,
//             state: req.body.state,
//         }, {
//         returning: true,
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(data => {
//             if (data[1] !== 0) {
//                 res.status(200).send({
//                     message: 'Bairro editado com sucesso'
//                 });
//             } else {
//                 res.status(500).send({ message: "Erro ao editar neighborhood" });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message });
//         });
// };


exports.newVisit = (req, res) => {
    Visit.create({
        consultorId: req.body.consultorId || '',
        cnpj: req.body.cnpj || '',
        razao_social: req.body.razao_social || '',
        responsavel: req.body.responsavel || '',
        telefone: req.body.telefone || '',
        cep: req.body.cep || '',
        enderecoCompany: req.body.enderecoCompany || '',
        numeroCompany: req.body.numeroCompany || '',
        complementoCompany: req.body.complementoCompany || '',
        neighborhoodCompany: req.body.neighborhoodCompany || '',
        city: req.body.city || '',
        state: req.body.state || '',
        status_visita: req.body.success || '',
        reason: req.body.reason || '',
        sub_reason: req.body.sub_reason || '',
        obs: req.body.obs || ''
    })
        .then(visits => {
            res.send({ message: "Visita registrada com sucesso" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

