const { authJwt } = require("../middleware");
const controller = require("../controllers/users/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isConsultor],
    controller.consultorBoard
  );

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // Rota para listar usuário
  app.get(
    "/api/user/list",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.showUsers
  );

  // Rota para criar usuário
  app.post(
    "/api/user/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // Rota para editar usuário
  app.put(
    "/api/user/edit/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editUser
  );

  // Rota para deletar usuário
  app.delete(
    "/api/user/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );
};
