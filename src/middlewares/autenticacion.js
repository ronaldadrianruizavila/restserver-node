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

let verificacionUrl = (req, res, next) => {
    let {toquen} = req.query;

    if(!toquen){
        return res.status(400).json({
            ok:false,
            err:{
                message:'toquen es necesario'
            }
        })
    }

    if(toquen){
        jwt.verify(toquen,secret,(err,decoded)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message:'toquen es invalido'
                    }
                })
            }
            if(decoded){
                req.user = decoded.user;
                next()
            }
        })
    }

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
    verficaAdminRole,
    verificacionUrl
}