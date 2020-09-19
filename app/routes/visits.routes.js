const { authJwt } = require("../middleware");
const controller = require("../controllers/visits/visits.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/visits/list",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showVisits
  );

  app.get(
    "/api/visits/list/:id",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showOneVisit
  );

  app.post(
    "/api/visit/new",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.newVisit
  );
};
