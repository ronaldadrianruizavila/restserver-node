const login = {}
const User   = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { secret,exp } = require('../env')
login.index = async (req, res)=>{
    let {email, password} = req.body;
   
    
    let user = await User.findOne({email});

    if(!user || !password){
        return res.status(400).json({
            message:'{Usuario} o password incorrectos'
        })
    }

    if(!bcrypt.compareSync(password,user.password)){
        return res.status(400).json({
            message:'Usuario o {password} incorrectos'
        })
    }

    let token = jwt.sign({
        user
    },secret,{expiresIn:exp})

    return res.json({
        ok:'true',
        user,
        token
    })

}

module.exports = login;