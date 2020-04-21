const { authJwt } = require("../middleware");
const controller = require("../controllers/bairros/bairro.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Rota para listar bairro
  app.get(
    "/api/bairro/list",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.showBairros
  );

  // Rota para criar bairro
  app.post(
    "/api/bairro/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.newBairro
  );

  // Rota para editar bairro
  app.put(
    "/api/bairro/edit/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editBairro
  );

  // Rota para deletar bairro
  app.delete(
    "/api/bairro/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteBairro
  );
};
