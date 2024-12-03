const ObraSocial = require('../models/obraSocial');

exports.altaObraSocial = async (req, res) => {
    try {
      const data = req.body;
  
      if (!data.nombre) {
        req.session.errorMessage = 'El campo nombre es obligatorio.';
        return res.status(400).redirect('/obra/index');
      }
  
      const buscarObra = await ObraSocial.findOne({ where: { nombre: data.nombre } });
      if (buscarObra) {
        req.session.errorMessage = 'Ya existe una obra social con ese nombre.';
        return res.status(409).redirect('/obra/index');
      }
  
      await ObraSocial.create(data);
      req.session.message = `¡La Obra Social: ${data.nombre} fue creada exitosamente!`;
      return res.status(200).redirect('/obra/index');
    } catch (error) {
        return res.status(500).json('Se produjo un error: '+error);
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
        req.session.message = `Obra Social: ${obraSocial.nombre} desactivada!`;
        return res.status(200).redirect('/obra/index');
    } catch (error) {
        //console.error('Error al borrar la Obra Social:', error);
        res.status(500).json({ message: 'Error al borrar la Obra Social', error });
        
    }
};

//listar obras en el index
exports.cargarObras = async (req,res)=>{
    try {
        const obrasCreadas = await ObraSocial.findAll();
        if(!obrasCreadas){
            return res.status(404).json('No se encontraron Obras sociales!');
        }
        res.status(200).render('obra/index.pug', {obrasCreadas});
    } catch (error) {
        return res.status(500).json('Se produjo un error: '+error);
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
        req.session.message = `Obra Social: ${obraSocial.nombre} reactivada con exito!`;
        return res.status(200).redirect('/obra/index');

    }catch(error){
        res.status(500).json({ message: 'Error al borrar la Obra Social', error });
    }
    
}
//cargar vista formulario editar
exports.editarObraSocialGet = async (req, res) => {
    try {
        const id = req.params.id; 
        const obra = await ObraSocial.findByPk(id);

        // Validar si se encontró la obra
        if (!obra) {
            return res.status(400).json('No se encontró la obra social');
        }

        // Renderizar la vista y pasar la obra como contexto
        return res.status(200).render('obra/editar',  {obra });
    } catch (error) {
        return res.status(500).json('Hubo un problema: ' + error.message);
    }
};

exports.actualizarObraSocial = async (req, res) => {
    try {
        const data = req.body; 
        const id = req.params.id;
        const buscarObra = await ObraSocial.findOne({where:{nombre:data.nombre}});
        if(buscarObra){
            //return res.status(400).json('Ya existe esa obra!');
            return res.status(409).render('obra/editar',{
                obra:buscarObra,//le paso los datos de la obra para que se me muestre en la vista recargada
                errorMessage:'Ya existe esa obra!'
            });
        }
        await ObraSocial.update({ nombre: data.nombre}, { where: { id } });
        //res.redirect('/obra/index');
        req.session.message = `Obra Social: ${data.nombre} Actualizada con exito!`;
        return res.status(200).redirect('/obra/index');
    } catch (error) {
        return res.status(500).json('Hubo un problema: ' + error.message);
    }
};

