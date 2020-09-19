const { authJwt } = require("../middleware");
const controller = require("../controllers/status/status.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Rota para listar status
  app.get(
    "/api/status/list",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showStatus
  );

  app.get(
    "/api/status/list/:id",
    [authJwt.verifyToken, authJwt.isBackofficeOrAdmin],
    controller.showOneStatus
  );

  // Rota para criar status
  app.post(
    "/api/status/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.newStatus
  );

  // Rota para editar status
  app.put(
    "/api/status/edit/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editStatus
  );

  // Rota para deletar status
  app.delete(
    "/api/status/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteStatus
  );
};
