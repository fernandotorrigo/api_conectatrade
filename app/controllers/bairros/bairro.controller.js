const db = require("../../models");
const Bairro = db.bairro;

exports.deleteBairro = (req, res) => {

    Bairro.destroy({
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

exports.showBairros = (req, res) => {
    Bairro.findAll({})
        .then(bairros => {
            res.status(200).send({ bairros });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.editBairro = (req, res) => {
    // Username
    User.update(
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
                    message: 'bairro editado com sucesso'
                });
            } else {
                res.status(500).send({ message: "Erro ao editar bairro" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.newBairro = (req, res) => {
    // Save User to Database
    Bairro.create({
        cep: req.body.cep,
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
    })
        .then(bairro => {
            console.log('bairro', bairro)
            res.send({ message: "Usuário registrado com sucesso" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

