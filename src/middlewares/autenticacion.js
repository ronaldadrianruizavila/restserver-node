const jwt = require('jsonwebtoken');
const User = require('../models/user')
const { secret } = require('../env')

let verificacion = (req, res, next) => {
    let toquen = req.get('toquen');
    if (!toquen) {
        return res.json({
            ok: false,
            errors: [
                'Es necesario mandar el token'
            ]
        });
    }
    let userRes = jwt.verify(toquen, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                errors: [
                    'toquen no valido'
                ]
            });
        }
        req.user = decoded.user;
        next();
    }
    )
}

let verficaAdminRole = (req,res,next)=>{
    let user = req.user;
    console.log(user);
    if(user.role == 'ADMIN_ROLE'){
        next()
    }else{
        res.json({
            message:'No tiene permisos de administrador'
        })
    }

}

module.exports = {
    verificacion,
    verficaAdminRole
}