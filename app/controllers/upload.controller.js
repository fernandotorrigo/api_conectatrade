const db = require("../models");
const jimp = require("jimp");
var csv = require("csvtojson");

exports.uploadArquivoCsv = async (req, res) => {
    const files = req.files;
    if (files) {
        let query = 'UPDATE company_person_registrations C JOIN ( ';

        await csv()
            .fromFile('./' + req.files.fileKey.path)
            .then(function (jsonArrayObj) {
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

exports.newUploadArquivoFotos = async (req, res) => {
    const files = req.files;

    var formidable = require('formidable');
    var form = new formidable.IncomingForm();
    var fs = require('fs');
    const objDate = new Date();

    var dia = objDate.getDate();           // 1-31
    var mes = objDate.getMonth();          // 0-11 (zero=janeiro)
    var ano4 = objDate.getFullYear();       // 4 dígitos
    var hora = objDate.getHours();          // 0-23
    var min = objDate.getMinutes();        // 0-59
    var seg = objDate.getSeconds();        // 0-59

    var str_data = dia + '-' + (mes + 1) + '-' + ano4;
    var str_hora = hora + '-' + min + '-' + seg;

    console.log('Hoje é ' + str_data + ' às ' + str_hora);
    const month = Number(objDate.getMonth() + 1) < 10 ? '0' + Number(objDate.getMonth() + 1) : Number(objDate.getMonth() + 1);
    const pasta = 'uploads/fotos/' + objDate.getDate() + '-' + month + '-' + objDate.getFullYear();

    if (!fs.existsSync(pasta)) {
        //Efetua a criação do diretório
        fs.mkdirSync(pasta);
    }

    form.parse(req, function (err, fields, files) {

        var oldpath = files.file.path;
        var newpath = pasta + '/' + str_hora + '-' + files.file.name;
        fs.rename(oldpath, newpath, async (err) => {
            if (err) {
                res.status(500).send({ message: 'Erro ao fazer upload' + err });
            } else {
                if (files) {
                    console.log(files.file);
                    if (/image/gi.test(files.file.type)) {
                        const image = await jimp.read(newpath);
                        image.resize(1000, jimp.AUTO);
                        await image.writeAsync(newpath);
                    }

                    res.status(200).send(
                        { file: { ...files.file, path: newpath } });
                } else {
                    res.status(500).send({ message: 'Erro ao fazer upload' });
                }
            }
        });
    });
}


exports.newUploadArquivoCsv = async (req, res) => {
    const files = req.files;

    var formidable = require('formidable');
    var form = new formidable.IncomingForm();
    var fs = require('fs');
    const objDate = new Date();

    var dia = objDate.getDate();           // 1-31
    var mes = objDate.getMonth();          // 0-11 (zero=janeiro)
    var ano4 = objDate.getFullYear();       // 4 dígitos
    var hora = objDate.getHours();          // 0-23
    var min = objDate.getMinutes();        // 0-59
    var seg = objDate.getSeconds();        // 0-59

    var str_data = dia + '-' + (mes + 1) + '-' + ano4;
    var str_hora = hora + '-' + min + '-' + seg;

    console.log('Hoje é ' + str_data + ' às ' + str_hora);
    const month = Number(objDate.getMonth() + 1) < 10 ? '0' + Number(objDate.getMonth() + 1) : Number(objDate.getMonth() + 1);
    const pasta = 'uploads/csv/' + objDate.getDate() + '-' + month + '-' + objDate.getFullYear();

    if (!fs.existsSync(pasta)) {
        //Efetua a criação do diretório
        fs.mkdirSync(pasta);
    }

    form.parse(req, function (err, fields, files) {

        console.log(12222, JSON.stringify(files))
        var oldpath = files.fileKey.path;
        var newpath = pasta + '/' + str_hora + '-' + files.fileKey.name;
        fs.rename(oldpath, newpath, async (err) => {
            if (err) {
                res.status(500).send({ message: 'Erro ao fazer upload' + err });
            } else {
                if (files) {
                    let query = 'UPDATE company_person_registrations C JOIN ( ';

                    await csv()
                        .fromFile(newpath)
                        .then(function (jsonArrayObj) {
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
                        res.status(500).send({ message: err });
                    });
                    // res.status(200).send({ message: 'Base de dados importada com sucesso' });


                } else {
                    res.status(500).send({ message: 'Erro ao fazer upload' });
                }
            }
        });
    });
}