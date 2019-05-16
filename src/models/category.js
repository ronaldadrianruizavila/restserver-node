const {Schema, model} = require('mongoose')


let categorySchema = new Schema({
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    descripcion:{
        type:String,
        unique:true,
        required:[true,'La descripcion es obligatoria']
    }
})

module.exports =  model('Category',categorySchema)