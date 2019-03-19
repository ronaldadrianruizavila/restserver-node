module.exports = ctr = {}

ctr.index = (req, res) => {
    res.send('hola');
}

ctr.create = (req, res) => {
    if (!req.body.API_KEY) {
        res.status(400).json({ errors: 'falta el API_KEY' })
    }
    res.status(200).json({ messsage: 'usuario creado' })
}