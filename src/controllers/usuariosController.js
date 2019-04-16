const User = require('../models/user')
const bycript = require('bcrypt');
const ctr = {}
const _ = require('underscore');

ctr.index = (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let hasta = Number(req.query.hasta) || 5.
    let estado = req.query.estado || null

    User.find({ estado }, 'nombre email role estado google imagen')
        .skip(desde)
        .limit(hasta)
        .exec()
        .then(async(response) => {

            let conteo = await User.countDocuments();

            res.status(200).json({
                conteo,
                response
            })
        })
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
    var user;
    const id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    User.findOneAndUpdate({ _id: id }, body, {
            new: true,
            runValidators: true,
            context: 'query'
        })
        .then((response) => {
            user = response;
            res.status(200).json({
                user,
            });

        }).catch(err => {
            res.status(400).json(err);
        })
}

ctr.delete = (req, res) => {
    let id = req.params.id;
    body = {
        estado: false,
    }

    User.findOneAndUpdate({ _id: id }, body, {
        runValidators: true,
        context: 'query',
    }).then(userioRes => {
        res.status(200).json({
            userioRes
        })
    }).catch(() => res.status(400).json({ ok: false }))
}

module.exports = ctr;