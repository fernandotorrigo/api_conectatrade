const { authJwt } = require("../middleware");
const controller = require("../controllers/role/role.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Rota para listar neighborhood
  app.get(
    "/api/role/list",
    [authJwt.verifyToken, authJwt.isBackofficeOrAdmin],
    controller.showRoles
  );
};
