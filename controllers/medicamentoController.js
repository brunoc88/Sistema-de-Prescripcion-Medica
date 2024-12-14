const Medicamento = require('../models/medicamento');
const Forma = require('../models/forma');
const Familia = require('../models/familia');
const Categoria = require('../models/categoria');

//GET vista index Medicamentos
exports.vistaIndexMedicamentos = async (req, res) => {
    try {
        //listo todos los medicamentos
        const medicamentos = await Medicamento.findAll({
            include: [{
                model: Forma
            }, {
                model: Familia
            }, {
                model: Categoria
            }]
        })
        if (!medicamentos) {
            return res.status(404).json('No se encontraron medicamentos!');
        }
        res.status(200).render('medicamento/index', { medicamentos })
    } catch (error) {
        return res.json('Hubo un error: ' + error);
    }
}

//GET vista Alta Medicamento
exports.vistaAltaMedicamento = async (req, res) => {
    try {
        // Listo las formas, familias y categorías activas en orden alfabético
        const formas = await Forma.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });

        const familias = await Familia.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });

        const categorias = await Categoria.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });


        return res.status(200).render('medicamento/alta', { formas, familias, categorias })

    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}

//POST alta Medicamento
exports.altaMedicamento = async (req, res) => {
    try {
        const data = req.body;

        // Comprobamos que no exista duplicado
        const medicamento = await Medicamento.findOne({
            where: {
                nombre: data.nombre,
                concentracion: data.concentracion,
                cantidad: data.cantidad,
                id_forma: data.id_forma,
                id_familia: data.id_familia,
                id_categoria: data.id_categoria,
            }
        });

        // Cargamos las familias, formas y categorías como tambien vamos a pararle los datos del medicamento
        //el cual ingreso previo al error
        const formas = await Forma.findAll({ where: { estado: true } });
        const familias = await Familia.findAll({ where: { estado: true } });
        const categorias = await Categoria.findAll({ where: { estado: true } });

        if (medicamento) {
            return res.status(409).render('medicamento/alta', {
                errorMessage: 'Ya existe un medicamento con esas características!',
                medicamento,
                categorias,
                familias,
                formas
            });
        }

        // Creación del medicamento
        await Medicamento.create(data);
        req.session.message = 'Medicamento creado con éxito!';
        return res.status(200).redirect('/medicamento/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
};

//GET vista editar Medicamento
exports.vistaEditarMedicamento = async (req, res) => {
    try {
        const id = req.params.id;
        //busco el medicamento para pasar a la vista
        const medicamento = await Medicamento.findOne({
            include: [{
                model: Forma
            }, {
                model: Familia
            }, {
                model: Categoria
            }],
            where: { idMedicamento: id }
        })
        // Listo las formas, familias y categorías activas en orden alfabético
        const formas = await Forma.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });

        const familias = await Familia.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });

        const categorias = await Categoria.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });

        // res.json(medicamento);
        return res.status(200).render('medicamento/editar',
            {
                medicamento,
                formas,
                familias,
                categorias
            });
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }

}


//PUT actualizar Medicamento 
exports.actualizarMedicamento = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        // Comprobamos que no exista duplicado
        const medicamento = await Medicamento.findOne({
            where: {
                nombre: data.nombre,
                concentracion: data.concentracion,
                cantidad: data.cantidad,
                id_forma: data.id_forma,
                id_familia: data.id_familia,
                id_categoria: data.id_categoria,
            }
        });

        // Cargamos las familias, formas y categorías como tambien vamos a pararle los datos del medicamento
        //el cual ingreso previo al error
        // Listo las formas, familias y categorías activas en orden alfabético
        const formas = await Forma.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });

        const familias = await Familia.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });

        const categorias = await Categoria.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });


        if (medicamento) {
            return res.status(409).render('medicamento/editar', {
                errorMessage: 'Ya existe un medicamento con esas características!',
                medicamento,
                categorias,
                familias,
                formas
            });
        }
        //actualizacion del medicamento
        await Medicamento.update(data, { where: { idMedicamento: id } })
        req.session.message = 'Medicamento actualizado con exito!';
        return res.status(200).redirect('/medicamento/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}

//PATCH descativar Medicamento
exports.desactivarMedicamento = async (req, res) => {
    try {
        const id = req.params.id;
        //medicamento
        const medicamento = await Medicamento.findByPk(id);
        await Medicamento.update({ estado: false }, { where: { idMedicamento: id } })
        req.session.message = 'Medicamento Desactivado!';
        return res.status(200).redirect('/medicamento/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH activar Medicamento
exports.activarMedicamento = async (req, res) => {
    try {
        const id = req.params.id;
        //medicamento
        const medicamento = await Medicamento.findByPk(id);
        await Medicamento.update({ estado: true }, { where: { idMedicamento: id } })
        req.session.message = 'Medicamento Activado!';
        return res.status(200).redirect('/medicamento/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}