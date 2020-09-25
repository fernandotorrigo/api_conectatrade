const { authJwt } = require("../middleware");
const controller = require("../controllers/company_person_registration/company_person_registration.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Rota para buscar empresa com o mesmo cnpj
  app.get(
    "/api/company/list/:cnpj",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showAOneCompanny
  );

  // Rota para buscar empresa com o mesmo cnpj
  app.get(
    "/api/company/search-bycnpj/:cnpj",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showAOneCompanyByCnpj
  );

  app.get(
    "/api/company/faixa",
    [authJwt.verifyToken, authJwt.accessAllUsers],
    controller.showFaixaCompanny
  );
};
