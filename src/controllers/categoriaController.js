let Category = require('../models/category');

const category = {}

category.index = async (req, res) => {
    let categorys = Category.find()
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorys) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    message: err
                })
            }
            res.json({
                ok: true,
                categorys
            })
        })
}

category.show = async (req, res) => {
    let { id } = req.params;

    let responseUser = await Category.findById(id)
        .catch(err => {
            res.status(404).json({ ok: false, message: err });
        });

    if (responseUser) {
        res.json({ ok: true, user: responseUser })
    }

}

category.store = (req, res) => {
    const { _id } = req.user
    const description = req.body.description;
    console.log(_id)
    const category = new Category();
    category.descripcion = description;
    category.usuario = _id
    category.save((err, response) => {
        if (err) {
            return res.status(500).json({ ok: false, err })
        }
        if (!response) {
            return res.status(400).json({ ok: false, err })
        }
        return res.json(response);
    });


}

category.update = async (req, res) => {
    let { id } = req.params;
    let { description } = req.body
    let responseUser = await Category.findByIdAndUpdate(id, { descripcion: description }, { new: true })
        .catch(err => {
            res.status(404).json({ ok: false, message: err });
        });

    if (responseUser) {
        res.json({ ok: true, user: responseUser })
    }
}

category.delete = async (req, res) => {
    let { id } = req.params;
    let { description } = req.body
    let responseUser = await Category.findOneAndDelete(id)
        .catch(err => {
            res.status(404).json({ ok: false, message: err });
        });

    if (responseUser) {
        res.json({ ok: true, user: responseUser })
    }
}


module.exports = category
