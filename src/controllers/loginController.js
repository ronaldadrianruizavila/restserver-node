const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { secret, exp } = require('../env')
const { OAuth2Client } = require('google-auth-library');
const { clientID } = require('../env')
const client = new OAuth2Client(clientID);

const login = {}

login.index = async (req, res) => {
    let { email, password } = req.body;


    let user = await User.findOne({ email });

    if (!user || !password) {
        return res.status(400).json({
            message: '{Usuario} o password incorrectos'
        })
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
            message: 'Usuario o {password} incorrectos'
        })
    }

    let token = jwt.sign({
        user
    }, secret, { expiresIn: exp })

    return res.json({
        ok: 'true',
        user,
        token
    })

}

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}


login.google = async (req, resp) => {
    let token = req.body.idtoken;
   
    let googleUser = await verify(token).catch(err => {
        return res.status(403).json({
            ok: false,
            err
        })
    });

    let userDB = await User.findOne({ email: googleUser.email }).catch(err => {
            return res.status(500).json({
                ok: false,
                err
            })
    });

    if (userDB) {
        if (userDB.google === false) {
            return resp.status(400).json({
                ok: false,
                err: {
                    message: 'Debe de usar su atenticacion normal'
                }
            })
        } else {
            let token = jwt.sign({
                user: userDB
            }, secret, { expiresIn: exp });

            return resp.json({
                ok: true,
                usuario: userDB,
                token
            })
        }
    } else {
        let usuario = new User();
        let { nombre, email, img } = googleUser;
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.img = img;
        usuario.google = true;
        usuario.password = ':)'

        let user = await usuario.save().catch(err => {
            return resp.status(500).json({
                ok: false,
                err
            })
        })

        if(user){
            let token = jwt.sign({
                user
            }, secret, { expiresIn: exp })
    
            return resp.json({
                ok: 'true',
                user,
                token
            })   
        }
    }
}

module.exports = login;