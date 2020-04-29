const db = require("../../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.consultorBoard = (req, res) => {
  res.status(200).send("consultor Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};


exports.deleteUser = (req, res) => {

  User.destroy({
    where: {
      id: req.query.id
    }
  }).then(rowDeleted => { // rowDeleted will return number of rows deleted
    if (rowDeleted === 1) {
      res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } else {
      res.status(200).send({ message: 'Nenhum usuário encontrado para deletar' });
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.showUsers = (req, res) => {
  User.findAll({
    include: [
      {
        model: Role
      }
    ]
  })
    .then(users => {
      res.status(200).send([{ users }]);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.editUser = (req, res) => {

  // Username
  if (req.body.username || req.body.email) {
    User.findOne({
      where: {
        username: req.body.username,
        id: {
          [Op.not]: req.params.id
        }
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Erro: Já existe um outro usuário com este nome"
        });
        return;
      } else {
        User.update(
          {
            username: req.body.username,
            email: req.body.email,
            cpf: req.body.cpf,
            admissionDate: req.body.admissionDate,
            demissionDate: req.body.demissionDate,
            backoffice: req.body.backoffice,
            neighborhood: req.body.neighborhood,
            endereco: req.body.endereco,
            numero: req.body.numero,
            complemento: req.body.complemento,
            telefone: req.body.telefone,
          }, {
          returning: true,
          where: {
            id: req.params.id
          }
        })
          .then(data => {
            if (data[1] !== 0) {
              res.status(200).send({ 
                message: 'Usuário editado com sucesso'
               });
            } else {
              res.status(500).send({ message: "Erro ao editar usuário" });
            }
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });

  } else {
    res.status(500).send({
      message: "Erro ao atualizar e-mail ou usuário"
    });
    return;
  }
};

