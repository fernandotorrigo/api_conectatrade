const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {

  // Username
  if (req.body.username || req.body.email) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Erro: Este usuário ja esta em uso"
        });
        return;
      }

      // Email
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Erro: Este e-mail já esta em uso"
          });
          return;
        }

        next();
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });

    }).catch(err => {
      res.status(500).send({ message: err.message });
    });

  } else {
    res.status(500).send({
      message: "Favor preencher username e e-email"
    });
    return;
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Erro: Esta regra não existe = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
