const { authJwt } = require("../middleware");
const controller = require("../controllers/buscaCep.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Rota para listar accreditation
  app.get(
    "/api/busca-cep/:cep",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.buscaCep
  );
};
