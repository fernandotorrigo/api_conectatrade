const cep = require("cep-promise");

exports.buscaCep = (req, res) => {
    const numeroCep = req.params.cep
    if (numeroCep) {
        cep(numeroCep).then(data => {
            res.status(200).send(data);
        })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    } else {
        res.status(500).send({ message: 'Favor enviar o CEP corretamente' });
    }
};