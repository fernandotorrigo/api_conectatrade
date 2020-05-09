exports.uploadArquivo = (req, res) => {
    const files = req.files;
    // console.log(req);
    if (files) {
        res.status(200).send(files);
    } else {
        res.status(500).send({ message: 'Erro ao fazer upload'});
    }
};