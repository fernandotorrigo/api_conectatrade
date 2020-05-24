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

  // Rota para listar usuário
  app.get(
    "/api/user/list",
    [authJwt.verifyToken, authJwt.isBackofficeOrAdmin],
    controller.showUsers
  );

  app.get(
    "/api/user/list/:id",
    [authJwt.verifyToken, authJwt.isBackofficeOrAdmin],
    controller.showOneUser
  );
  // Rota para listar usuário
  app.get(
    "/api/user-backoffice/list",
    [authJwt.verifyToken, authJwt.isBackofficeOrAdmin],
    controller.showUsersBackoffice
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

  // Rota para alterar senha
  app.put(
    "/api/user/edit-password/:id",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.editPasswordUser
  );

  // Rota para deletar usuário
  app.delete(
    "/api/user/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );
};
