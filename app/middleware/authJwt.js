const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  // console.log('entrou aqui')
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user) {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Requer perfil Admin!"
        });
        return;
      });
    } else {
      res.status(404).send({
        message: "O seu Usuário não foi encontrado"
      });
      return;
    }
  });
};



isConsultor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user) {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "consultor") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Requer perfil consultor!"
        });
      });
    } else {
      res.status(404).send({
        message: "Usuário não encontrado"
      });
      return;
    }
  });
};


getIsConsultor = (req, res, next) => {

  User.findByPk(req.userId).then(user => {

    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "consultor") {
          // console.log('é consutor sim')
          next();
          return true;
        } else {
          return false;
        }
      }
    });
  });
};

getIsBackoffice = (req, res, next) => {

  User.findByPk(req.userId).then(user => {

    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "backoffice") {
          // console.log('é consutor sim')
          next();
          return true;
        } else {
          return false;
        }
      }
    });
  });
};

// TODO: validar se o usuário foi encontrado com sucesso
isBackofficeOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "backoffice") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Rquer perfis de consultor ou Admin!"
      });
    });
  });
};

// TODO: validar se o usuário foi encontrado com sucesso
isConsultorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "consultor") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Rquer perfis de consultor ou Admin!"
      });
    });
  });
};

accessAllUsers = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name) {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require any login!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isConsultor: isConsultor,
  isConsultorOrAdmin: isConsultorOrAdmin,
  isBackofficeOrAdmin: isBackofficeOrAdmin,
  accessAllUsers: accessAllUsers,
  getIsConsultor: getIsConsultor,
  getIsBackoffice: getIsBackoffice
};
module.exports = authJwt;
