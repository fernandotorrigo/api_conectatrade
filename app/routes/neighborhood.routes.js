const { authJwt } = require("../middleware");
const controller = require("../controllers/neighborhoods/neighborhood.controller");

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
    "/api/neighborhood/list",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.showNeighborhoods
  );

  // Rota para criar neighborhood
  app.post(
    "/api/neighborhood/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.newNeighborhood
  );

  // Rota para editar neighborhood
  app.put(
    "/api/neighborhood/edit/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editNeighborhood
  );

  // Rota para deletar neighborhood
  app.delete(
    "/api/neighborhood/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteNeighborhood
  );
};
