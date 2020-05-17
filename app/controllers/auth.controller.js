const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  let rolesId = req.body.perfil;
  roleName = db.ROLES[rolesId - 1];
  roleArray = [roleName];
  // console.log('roleArray,', roleArray);

  if (!roleArray) {
    res.status(400).send({
      message: "Não foi possivel selecionar o perfil"
    });
    return;
  }
  // Save User to Database
  User.create({
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
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(user => {
      if (roleArray) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: roleArray
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Usuário registrado com sucesso" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Usuário registrado com sucesso" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha invalida"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name.toUpperCase() === 'CONSULTOR' && req.body.from === 'painelAdmin') {
            return res.status(401).send({
              accessToken: null,
              message: "Login não permitido"
            });
          }

          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }


        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
