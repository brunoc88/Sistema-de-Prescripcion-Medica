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
        const data = req.body;

        // Validamos que los campos necesarios no sean nulos ni vacíos
        if (!data.nombre) {
            return res.status(400).json({ message: 'El campo nombre es obligatorios' });
        }

        // Buscamos si ya existe una obra con ese nombre
        const buscarObra = await ObraSocial.findOne({ where: { nombre: data.nombre } });
        //si ya es verdad que existe entonces devuelve un 400
        if (buscarObra) {
            return res.status(400).json({ message: 'Ya existe una obra social con ese nombre!' });
        }

        // Si todo está bien, creamos la nueva obra social pasando todo el objeto directamente
        const nuevaObraSocial = await ObraSocial.create(data);

        //res.status(201).json({ message: 'Obra Social creada exitosamente', obraSocial: nuevaObraSocial });
        res.redirect('/obra/index');
    } catch (error) {
        console.error('Error al crear la Obra Social:', error);
        res.status(500).json({ message: 'Error al crear la Obra Social', error });
    }
};


exports.bajarObraSocial = async (req, res) => {
    try {
        const { id } = req.params; // Suponiendo que el ID se pasa como parámetro de la URL

        // Verificamos si la obra social existe
        const obraSocial = await ObraSocial.findByPk(id);

        if (!obraSocial) {
            return res.status(404).json({ message: 'Obra Social no encontrada' });
        }

         // Realizamos el "borrado lógico" cambiando el estado a falso
         await ObraSocial.update({ estado: false }, { where: { id } });

        //res.status(200).json({ message: 'Obra Social eliminada lógicamente', obraSocial });
        res.redirect('/obra/index');
    } catch (error) {
        console.error('Error al borrar la Obra Social:', error);
        res.status(500).json({ message: 'Error al borrar la Obra Social', error });
    }
};


exports.cargarObras = async (req,res)=>{
    try {
        const obrasCreadas = await ObraSocial.findAll();
        if(!obrasCreadas){
            return res.status(400).json('No se encontraron Obras sociales!');
        }
        res.status(200).render('obra/index.pug', {obrasCreadas});
    } catch (error) {
        res.status(500).send('Hubo un problema al acceder a la pagina' + error);
    };
};

//para volver a activarla
exports.activarObraSocial = async(req,res)=>{
    try{
        const id = req.params.id;
    
        const obraSocial = await ObraSocial.findByPk(id);

        if (!obraSocial) {
            return res.status(404).json({ message: 'Obra Social no encontrada' });
        }

         // reactivamos la obra
        await ObraSocial.update({ estado: true }, { where: { id } });

        //res.status(200).json({ message: 'Obra Social eliminada lógicamente', obraSocial });
        res.redirect('/obra/index');

    }catch(error){
        
        res.status(500).json({ message: 'Error al borrar la Obra Social', error });
    }
    
}

exports.editarObraSocialGet = async (req, res) => {
    try {
        const id = req.params.id; // Corregir el acceso al parámetro
        const obra = await ObraSocial.findByPk(id);

        // Validar si se encontró la obra
        if (!obra) {
            return res.status(400).json('No se encontró la obra social');
        }

        // Renderizar la vista y pasar la obra como contexto
        res.render('obra/editar',  {obra });
    } catch (error) {
        return res.status(500).json('Hubo un problema: ' + error.message);
    }
};

exports.editarObraSocialPatch = async (req, res) => {
    try {
        const data = req.body; 
        const id = req.params.id;
        const buscarObra = await ObraSocial.findOne({where:{nombre:data.nombre}});
        if(buscarObra){
            return res.status(400).json('Ya existe esa obra!');
        }
        await ObraSocial.update({ nombre: data.nombre}, { where: { id } });
        res.redirect('/obra/index');
    } catch (error) {
        return res.status(500).json('Hubo un problema: ' + error.message);
    }
};

