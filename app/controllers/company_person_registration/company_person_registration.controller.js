const db = require("../../models");
const CompanyPersonRegistration = db.company_person_registration;
const Accreditation = db.accreditation;

exports.showAOneCompanny = async (req, res) => {
  CompanyPersonRegistration.findOne({
    where: {
      cnpj: req.params.cnpj,
    },
  })
    .then((company) => {
      res.status(200).send([{ company }]);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.showAOneCompanyByCnpj = async (req, res) => {
  Accreditation.findOne({
    include: [
      {
        model: CompanyPersonRegistration,
        where: { cnpj: req.params.cnpj},
      },
    ],
    limit: 1,
    order: [["id", "DESC"]],
  })
    .then((accreditations) => {
      res.status(200).send( accreditations);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.showFaixaCompanny = async (req, res) => {
  db.sequelize
    .query(
      'SELECT faixa FROM company_person_registrations where faixa <> "" GROUP BY faixa',
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(function (faixa) {
      res.status(200).send([{ faixa }]);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
