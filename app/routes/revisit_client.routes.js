const { authJwt } = require("../middleware");
const controller = require("../controllers/revisit_clients/revisit_clients.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/revisits/list",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showRevisitClients
  );

  app.get(
    "/api/revisits/list/:id",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showOneRevisit
  );

  app.post(
    "/api/revisit/new",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.newRevisitClient
  );
};
