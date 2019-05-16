const producto = require('../models/product');
const categoriaM = require('../models/category');

const ctx = {}

ctx.index = (req, res) => {
    let fin = Number(req.query.fin) || 5;
    let ini = Number(req.query.ini) || 0;
    producto
        .find({})
        .skip(ini)
        .limit(fin)
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre')
        .exec((err, resProducts) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }

            if (resProducts) {
                res.json({
                    ok: true,
                    products: resProducts
                })
            }
        })
}

ctx.search = (req, res) => {
    let {termino} = req.params||'';

    producto.find({nombre:{$regex:termino}})
    .populate('categoria','descripcion')
    .exec((err,resProducts)=>{
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        if (resProducts) {
            res.json({
                ok: true,
                products: resProducts
            })
        }
    })
}

ctx.show = (req, res) => {
    let { id } = req.params

    producto.findById(id, (err, resProduct) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            product: resProduct
        })



    })

}

ctx.delete = async (req, res) => {
    let { id } = req.params;

    let { disponible } = req.body || false

    let resPro = await producto.findByIdAndUpdate(id, { disponible }, { new: true })
        .catch(err => {
            return res.json({
                ok: false,
                err
            })
        })
    if (resPro) {
        return res.json({
            ok: true,
            user: resPro
        })
    }
}

ctx.store = async (req, res) => {
    let { nombre,
        precioUni,
        descripcion,
        disponible,
        categoria,
        img } = req.body;

    const { _id } = req.user

    categoriaM.findById(categoria, (err, resCategory) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            })
        }

        if (resCategory) {
            let productNew = new producto();
            productNew.nombre = nombre;
            productNew.descripcion = descripcion;
            productNew.precioUni = precioUni;
            if (img) {
                productNew.img = img;
            }
            productNew.disponible = disponible;
            productNew.categoria = categoria;
            productNew.usuario = _id;

            productNew.save((err, resProduct) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }
                if (resProduct) {
                    return res.json({
                        ok: true,
                        product: resProduct
                    })
                }
            });

        }

    })
}

ctx.update = (req, res) => {

}

module.exports = ctx