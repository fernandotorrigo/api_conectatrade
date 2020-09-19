const { authJwt } = require("../middleware");
const controller = require("../controllers/upload.controller");
const multipart = require("connect-multiparty");
const fs = require('fs');

const multipartMiddleware = multipart({ uploadDir: retornaPasta('fotos') });
const multipartMiddlewareCsv = multipart({ uploadDir: retornaPasta('csv') });

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
    [multipartMiddleware, authJwt.verifyToken, authJwt.accessAllUsers],
    controller.uploadArquivo
  );

  // Rota upload de csv
  app.post(
    "/api/import-database",
    [multipartMiddlewareCsv, authJwt.verifyToken, authJwt.accessAllUsers],
    controller.uploadArquivoCsv
  );

};

function retornaPasta( dirMain) {
  const objDate = new Date();
  const month = Number(objDate.getMonth() + 1) < 10 ? '0' + Number(objDate.getMonth() + 1) : Number(objDate.getMonth() + 1);
  const pasta = './uploads/' + dirMain + '/' + objDate.getDate() + '-' + month + '-' + objDate.getFullYear();
  //Verifica se não existe
  if (!fs.existsSync(pasta)) {
    //Efetua a criação do diretório
    fs.mkdirSync(pasta);
  }
  return pasta;
}