const db = require("../../models");
const CompanyPersonRegistration = db.company_person_registration;

exports.showAOneCompanny = async (req, res) => {
    CompanyPersonRegistration.findOne({
        where: {
            cnpj: req.params.cnpj
        }
    })
        .then(company => {
            res.status(200).send([{ company }]);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}
