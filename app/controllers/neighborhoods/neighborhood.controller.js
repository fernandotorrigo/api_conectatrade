const db = require("../../models");
const Neighborhood = db.neighborhood;

exports.deleteNeighborhood = (req, res) => {

    Neighborhood.destroy({
        where: {
            id: req.query.id
        }
    }).then(rowDeleted => { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
            res.status(200).send({ message: 'Bairro deletado com sucesso' });
        } else {
            res.status(200).send({ message: 'Nenhum bairro encontrado para deletar' });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.showNeighborhoods = (req, res) => {
    Neighborhood.findAll({})
        .then(neighborhoods => {
            res.status(200).send([{ neighborhoods }]);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.editNeighborhood = (req, res) => {
    // Neighborhood
    Neighborhood.update(
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
                    message: 'Bairro editado com sucesso'
                });
            } else {
                res.status(500).send({ message: "Erro ao editar neighborhood" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.newNeighborhood = (req, res) => {
    // Save User to Database
    Neighborhood.create({
        cep: req.body.cep,
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
    })
        .then(neighborhood => {
            res.send({ message: "Neighborhood registrado com sucesso" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

