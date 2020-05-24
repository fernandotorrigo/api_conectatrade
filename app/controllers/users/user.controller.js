var bcrypt = require("bcryptjs");
const db = require("../../models");
const User = db.user;
const Role = db.role;
const UserRole = db.user_roles;
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
    attributes: {
      include: [
        [db.sequelize.literal('(SELECT nomeUsuario FROM users U where U.id = users.idBackoffice)'), 'nameBackoffice'],
        [db.sequelize.literal('(SELECT name FROM neighborhoods N where N.id = users.idBairro)'), 'nameBairro']
      ]
    },
    include: [
      {
        model: Role
      }
    ],
    order: [
      ['id', 'DESC']
    ],
  })
    .then(users => {
      res.status(200).send([{ users }]);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.showOneUser = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
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

exports.showUsersBackoffice = (req, res) => {
  User.findAll({
    include: [
      {
        model: Role,
        where: { id: 2 }
      },
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

  let rolesId = req.body.perfil;
  roleName = db.ROLES[rolesId - 1];
  roleArray = [roleName];
  if (!roleArray) {
    res.status(400).send({
      message: "Não foi possivel selecionar o perfil"
    });
    return;
  }
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
            cpf: req.body.cpf,
            dataAdmissao: req.body.dataAdmissao,
            dataDemissao: req.body.dataDemissao,
            username: req.body.username,
            nomeUsuario: req.body.nomeUsuario,
            idBackoffice: req.body.idBackoffice,
            idBairro: req.body.idBairro,
            email: req.body.email,
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
          .then(user => {

            // console.log(user)
            if (req.body.perfil) {
              UserRole.update(
                {
                  roleId: req.body.perfil,
                }, {
                returning: true,
                where: {
                  userId: req.params.id
                }
              }).then(roles => {
                res.send({ message: "Usuário editado com sucesso", roles });
              });
            } else {
              res.send({ message: "Dados de perfil vazios" });
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


exports.editPasswordUser = (req, res) => {

  console.log('adasdas')
  User.update(
    {
      password: bcrypt.hashSync(req.body.password, 8)
    }, {
    returning: true,
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      res.send({ message: "Senha alterada com sucesso"});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

