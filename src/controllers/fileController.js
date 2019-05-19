const user = require('../models/user');
const product = require('../models/product');
const fs = require('fs')
const path = require('path')
const fileCt = {}

fileCt.upload = (req, res) => {

    let { id, tipo } = req.params;
    let tiposValidos = ['productos', 'usuarios']

    if (!tiposValidos.includes(tipo)) {
        return res.status(500).json({
            ok: false,
            err: {
                message: `Los tipos validos ` + tiposValidos.join(',')
            }
        })
    }

    if (!(req.files)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha selecionado un archivo'
            }
        })
    }
    try {
        let { archivo } = req.files;

        let [name, ext] = archivo.name.split('.')

        const validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];

        if (!validExtensions.includes(archivo.mimetype)) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: `Only ${validExtensions.join(', ')} are accepted`
                }
            });
        }

        //cambiar nombre archivo
        let nameFile = `${id}-${new Date().getMilliseconds()}.${ext}`

        archivo.mv(`uploads/${tipo}/${nameFile}`, (err) => {
            if (err) {
                return res.status(500)
                    .json({
                        ok: false,
                        err
                    });
            }
            if (tipo === 'usuarios') {
                imagenUsuario(id, res, nameFile);
            } else {
                imagenProducto(id, res, nameFile)
            }
        });
    } catch (error) {
        return res.status(500)
            .json({
                ok: false,
                err: {
                    message: 'es necesario el parametro archivo'
                }
            });
    }
}

let imagenUsuario = (id, res, nombreArchivo) => {
    user.findById(id, (err, respBD) => {
        borraArchivo(nombreArchivo, 'usuarios')
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!respBD) {
            borraArchivo(nombreArchivo, 'usuarios')
            return res.status(400).json({
                ok: true,
                err: {
                    message: 'Usuario no existe'
                }
            })
        }

        borraArchivo(respBD.image, 'usuarios')

        respBD.image = nombreArchivo;

        respBD.save((err, resBd) => {

            return res.json({
                ok: true,
                usuario: resBd
            })
        })
    })
}

let borraArchivo = (name, tipo) => {
    let pathUrl = path
        .resolve(__dirname,
            `../../uploads/${tipo}/${name}`)

    if (fs.existsSync(pathUrl)) {
        fs.unlinkSync(pathUrl)
    }
}

let imagenProducto = (id, res, nombreArchivo) => {
    product.findById(id, (err, respBD) => {
        if (err) {
            borraArchivo(nombreArchivo, 'productos')
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!respBD) {
            borraArchivo(nombreArchivo, 'productos')
            return res.status(400).json({
                ok: true,
                err: {
                    message: 'Producto no existe'
                }
            })
        }
        borraArchivo(respBD.img, 'productos')

        respBD.img = nombreArchivo;

        respBD.save((err, resBd) => {
            return res.json({
                ok: true,
                producto: resBd
            })
        })
    })
}


fileCt.show = (req, res) => {
    let { tipo, img } = req.params;

    // let pathImg = `./uploads/${tipo}/${img}`;

    let pathUrl = path
        .resolve(__dirname,
            `../../uploads/${tipo}/${img}`)

    if (fs.existsSync(pathUrl)) {
        return res.sendFile(pathUrl)
    }
    else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg')
        return res.sendFile(noImagePath);
    }
}

module.exports = fileCt;