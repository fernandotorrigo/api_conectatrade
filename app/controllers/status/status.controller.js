const db = require("../../models");
const Status = db.status;

exports.deleteStatus = (req, res) => {

    Status.destroy({
        where: {
            id: req.query.id
        }
    }).then(rowDeleted => { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
            res.status(200).send({ message: 'Status deletado com sucesso' });
        } else {
            res.status(200).send({ message: 'Nenhum status encontrado para deletar' });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.showStatus = (req, res) => {
    Status.findAll({})
        .then(status => {
            res.status(200).send({ status });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.editStatus = (req, res) => {
    // Status
    Status.update(
        {
            name: req.body.name,
            color: req.body.color,
            blockedForConsultor: req.body.blockedForConsultor
        }, {
        returning: true,
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data[1] !== 0) {
                res.status(200).send({
                    message: 'Status editado com sucesso'
                });
            } else {
                res.status(500).send({ message: "Erro ao editar status" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.newStatus = (req, res) => {
    // Save User to Database
    Status.create({
        name: req.body.name,
        color: req.body.color,
        blockedForConsultor: req.body.blockedForConsultor
    })
        .then(status => {
            res.send({ message: "Status registrado com sucesso" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

