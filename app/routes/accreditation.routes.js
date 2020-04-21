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
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.showAccreditations
  );

  // Rota para criar accreditation
  app.post(
    "/api/accreditation/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.newAccreditation
  );

  // Rota para editar accreditation
  app.put(
    "/api/accreditation/edit/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editAccreditation
  );

  // Rota para deletar accreditation
  app.delete(
    "/api/accreditation/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAccreditation
  );
};
