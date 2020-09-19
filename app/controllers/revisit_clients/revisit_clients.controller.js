const db = require("../../models");
const RevisitClient = db.revisit_client;

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

exports.showRevisitClients = (req, res) => {
    RevisitClient.findAll({
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


exports.newRevisitClient = (req, res) => {
    console.log("bateu")
    RevisitClient.create({
        consultorId: req.body.consultorId || '',
        companyPersonRegistrationId: req.body.companyPersonRegistrationId || '',
        success: req.body.success || 'n',
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

