const { authJwt } = require("../middleware");
const controller = require("../controllers/upload.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Rota para upload de imagens
  app.post(
    "/api/upload",
    [authJwt.verifyToken, authJwt.accessAllUsers], controller.newUploadArquivoFotos);

  // Rota upload de csv
  app.post(
    "/api/import-database",
    [authJwt.verifyToken, authJwt.accessAllUsers], controller.newUploadArquivoCsv
  );

};