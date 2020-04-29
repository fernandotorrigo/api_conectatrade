const { authJwt } = require("../middleware");
const controller = require("../controllers/upload.controller");
const multipart = require("connect-multiparty");
const objDate = new Date();
const multipartMiddleware = multipart({ uploadDir: './uploads/' + objDate.getDate()+ '-' + objDate.getMonth() + '-' + objDate.getFullYear() });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Rota para listar accreditation
  app.post(
    "/api/upload",
    [multipartMiddleware, authJwt.verifyToken, authJwt.accessAllUsers],
    controller.uploadArquivo
  );
};
