const jimp = require("jimp");

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