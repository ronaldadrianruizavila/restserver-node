const User = require('../models/user')
const bycript = require('bcrypt');
const ctr = {}
const _ = require('underscore');

ctr.index = (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let hasta = Number(req.query.hasta) || 5.

    User.find({})
        .skip(desde)
        .limit(hasta)
        .exec()
        .then((response) => res.status(200).json(response))
        .catch(err => res.status(400).json({
            message: 'No existe error'
        }));
}

ctr.create = (req, res) => {
    const body = req.body;
    const user = new User({
        nombre: body.nombre,
        email: body.email,
        password: bycript.hashSync(body.password, 10),
        role: body.role
    });
    user.save().then(
        (usuarioRes) => {
            res.status(200).json({
                messsage: 'usuario creado',
                usuarioRes
            })
        }).catch(
        (err) => res.status(400).json(err)
    );
}

ctr.update = (req, res) => {
    let user;
    const id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    User.findOneAndUpdate(id, body, {
            new: true,
            runValidators: true,
            context: 'query'
        })
        .then(response => {
            user = response
            res.status(200).json({ user });
        }).catch(err => {
            res.status(400).json(err);
        })
}

module.exports = ctr;