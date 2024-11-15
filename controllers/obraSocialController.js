const ObraSocial = require('../models/obraSocial');

//con sintaxis de desestructuración
/*
exports.altaObraSocial = async (req, res) => {
    try {
        const { nombre, plan, estado } = req.body;
         // Validamos que los campos necesarios no sean nulos ni vacíos
         if (!nombre || !plan) {
            return res.status(400).json({ message: 'Los campos nombre y plan son obligatorios' });
        }
        
        // Verificamos si ya existe el plan
        const buscarPlan = await ObraSocial.findOne({ where: { plan: plan } });

        // Si el array tiene registros, el plan ya existe
        if (buscarPlan) {
            return res.status(400).json({ message: 'Ya se encuentra registrado ese plan en la obra social' });
        }

        const nuevaObraSocial = await ObraSocial.create({nombre, plan, estado });
        res.status(201).json({ message: 'Obra Social creada exitosamente', obraSocial: nuevaObraSocial });
    } catch (error) {
        console.error('Error al crear la Obra Social:', error);
        res.status(500).json({ message: 'Error al crear la Obra Social', error });
    }
};*/

//sin sitaxis de desestructuración

exports.altaObraSocial = async (req, res) => {
    try {
        // Asignamos el objeto completo de req.body a una variable
        const obraNueva = req.body;

        // Validamos que los campos necesarios no sean nulos ni vacíos
        if (!obraNueva.nombre || !obraNueva.plan) {
            return res.status(400).json({ message: 'Los campos nombre y plan son obligatorios' });
        }

        // Buscamos si el plan ya existe
        const buscarPlan = await ObraSocial.findOne({ where: { plan: obraNueva.plan } });
        //si ya es verdad que existe entonces devuelve un 400
        if (buscarPlan) {
            return res.status(400).json({ message: 'Ya existe una obra social con ese plan' });
        }

        // Si todo está bien, creamos la nueva obra social pasando todo el objeto directamente
        const nuevaObraSocial = await ObraSocial.create(obraNueva);

        res.status(201).json({ message: 'Obra Social creada exitosamente', obraSocial: nuevaObraSocial });
    } catch (error) {
        console.error('Error al crear la Obra Social:', error);
        res.status(500).json({ message: 'Error al crear la Obra Social', error });
    }
};


exports.borrarObraSocial = async (req, res) => {
    try {
        const { id } = req.params; // Suponiendo que el ID se pasa como parámetro de la URL

        // Verificamos si la obra social existe
        const obraSocial = await ObraSocial.findByPk(id);

        if (!obraSocial) {
            return res.status(404).json({ message: 'Obra Social no encontrada' });
        }

         // Realizamos el "borrado lógico" cambiando el estado a falso
         await ObraSocial.update({ estado: false }, { where: { id } });

        res.status(200).json({ message: 'Obra Social eliminada lógicamente', obraSocial });
    } catch (error) {
        console.error('Error al borrar la Obra Social:', error);
        res.status(500).json({ message: 'Error al borrar la Obra Social', error });
    }
};


