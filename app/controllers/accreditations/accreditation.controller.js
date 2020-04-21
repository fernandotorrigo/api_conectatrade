const db = require("../../models");
const Accreditation = db.accreditation;

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
    Accreditation.findAll({})
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
    // Save User to Database
    Accreditation.create({
        cep: req.body.cep,
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
    })
        .then(accreditation => {
            res.send({ message: "Credenciamento registrado com sucesso" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

