const db = require("../models");
const jimp = require("jimp");
var csv = require("csvtojson");

exports.uploadArquivo = async (req, res) => {
    const files = req.files;
    if (files) {
        if (/image/gi.test(files.file.type)) {
            const image = await jimp.read(files.file.path);
            image.resize(1200, jimp.AUTO);
            await image.writeAsync(files.file.path);
        }

        res.status(200).send(files);
    } else {
        res.status(500).send({ message: 'Erro ao fazer upload' });
    }
};

exports.uploadArquivoCsv = async (req, res) => {
    const files = req.files;
    if (files) {
        // console.log(req.files.fileKey.path)

        let query = 'UPDATE company_person_registrations C JOIN ( ';

        await csv()
            .fromFile('./' + req.files.fileKey.path)
            .then(function (jsonArrayObj) {
                // console.log('TAM:', jsonArrayObj.length)
                // console.log(jsonArrayObj)
                jsonArrayObj.forEach((element, index) => {
                    if (element.cnpj && element.faixa && element.faturamento) {
                        query += " SELECT '" + element.cnpj + "' AS cnpj, '" + element.faixa + "' AS new_faixa, '" + element.faturamento + "' AS new_faturamento ";
                        // console.log('INDEX:', index);
                        if (jsonArrayObj.length != Number(index + 1)) {
                            query += " UNION ALL ";
                        }
                    } else {
                        res.status(500).send({ message: 'Arquivo CSV inválido' });
                    }
                });

            })

        query += ') VALS ON C.cnpj = VALS.cnpj SET faixa = new_faixa, faturamento = new_faturamento';

        // console.log(query);
        await db.sequelize.query(query,
            { type: db.sequelize.QueryTypes.UPDATE }
        ).then(function (importacao) {
            res.status(200).send([{ importacao }]);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
        // res.status(200).send({ message: 'Base de dados importada com sucesso' });


    } else {
        res.status(500).send({ message: 'Erro ao fazer upload' });
    }
};
