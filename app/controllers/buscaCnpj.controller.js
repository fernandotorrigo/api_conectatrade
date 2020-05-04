const request = require("request");
const http = require("http");

exports.buscaCnpj = (req, res) => {

    request(`https://www.receitaws.com.br/v1/cnpj/${req.params.cnpj}`, (err, resp, body) => {
        if (body) {
            res.status(200).send(body);
        } else if (err) {
            res.status(500).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Erro não identificado' });
        }
    });
};