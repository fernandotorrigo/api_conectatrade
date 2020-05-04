const { authJwt } = require("../middleware");
const controller = require("../controllers/accreditations/accreditation.controller");

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
    "/api/accreditation/list",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showAccreditations,
  );

  // Rota para listar accreditation
  app.get(
    "/api/accreditation/list/:id",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showAOneaccreditations,
  );

  app.get(
    "/api/accreditation-admin/list/:id",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showAOneaccreditationsAdmin,
  );


  // Rota para criar accreditation
  app.post(
    "/api/accreditation/new",
    [authJwt.verifyToken, authJwt.isConsultorOrAdmin],
    controller.newAccreditation
  );

  // Rota para editar accreditation
  app.put(
    "/api/accreditation/edit/:id",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.editAccreditation
  );

  app.put(
    "/api/accreditation-admin/edit/:id",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.editAccreditationAdmin
  );

  // Rota para deletar accreditation
  app.delete(
    "/api/accreditation/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAccreditation
  );
};
