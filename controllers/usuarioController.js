const Usuario = require('../models/usuario');

const bcrypt = require('bcrypt');//para encriptar clave

//GET vista index usuario
exports.vistaIndexUsuario = async(req,res)=>{
    try {
        const usuarios = await Usuario.findAll();
        if(!usuarios){
            return res.status(404).json('No se encontraron usuarior!');
        }
        return res.status(200).render('usuario/index',{usuarios});
    } catch (error) {
        return res.status(500).json('Hubor un error: '+ error.errorMessage);
    }
}
//GET vista registrar usuario
exports.vistaRegistrarUsuario = async(req,res)=>{
    try {
        return res.status(200).render('usuario/alta');
    } catch (error) {
        return res.status(500).json('Hubo un error: '+error)
    }
}
//POST Crear Usuario
exports.altaUsuario = async (req, res) => {
    try {
      const data = req.body;
  
      // Verificar si ya existe un usuario con ese email
      const usuarioExistente = await Usuario.findOne({ where: { email: data.email } });
      if (usuarioExistente) {
      
        // Si ya existe, enviar los datos previos para que se muestren
        return res.status(409).render('usuario/alta', {
            errorMessage: 'Ya existe un usuario registrado con ese email. Vuelva a seleccionar una avatar y rol!',
            usuario: {
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                password: data.password    
            }
        });
    }
    
  
      // Generar salt y hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
  
      // Definir la imagen de avatar
      const avatar = req.file ? `/avatars/${req.file.filename}` : `/uploads/user.png`;
  
      // Crear el nuevo usuario
      await Usuario.create({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: hashedPassword,
        rol: data.rol,
        avatar
      });
  
      // Redirigir al index si todo fue correcto
      return res.status(200).redirect('/usuario/index');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      return res.status(500).json('Hubo un error: ' + error.message);
    }
};
  
//GET vista editar usuario
exports.vistaEditarUsuario = async(req,res)=>{
    try {
        const id = req.params.id;
        //busco el usuario
        const usuario = await Usuario.findOne({where:{id:id}});

        if(!usuario){
            return res.status(404).json('Usuario no encontrado!');
        }

        return res.status(200).render('usuario/editar',{usuario});
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.errorMessage);
    }
}

//PUT editar Empleado
exports.editarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        // Verifico si el usuario existe
        const usuario = await Usuario.findOne({ where: { id: id } });

        if (!usuario) {
            return res.status(404).json('Usuario no encontrado');
        }

        // Asignar avatar: usar el subido o el predeterminado
        const avatar = req.file ? `/avatars/${req.file.filename}` : usuario.avatar;

        // Actualizo el usuario
        await Usuario.update(
            { nombre: data.nombre, apellido: data.apellido, email: data.email, password: data.password, avatar: avatar, rol: data.rol },
            { where: { id: id } }
        );

        res.json('Usuario actualizado');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
};

//PATCH desactivar Usuario
exports.bajaUsuario = async(req,res)=>{
    try {
        const id = req.params.id;
        //busco el usuario
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json('Usuario no encontrado!');
        }
        await Usuario.update({estado:false},{where:{id:id}});
        req.session.message = `Usuario: ${usuario.nombre + ' ' + usuario.apellido} Desactivado!`
        return res.status(200).redirect('/usuario/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}

//PATCH reactivar Usuario
exports.activarUsuario = async(req,res)=>{
    try {
        const id = req.params.id;
        //busco usuario
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json('Usuario no encontrado!');
        }
        await Usuario.update({estado:true},{where:{id:id}});
        req.session.message = `Usuario: ${usuario.nombre + ' ' + usuario.apellido} activado con exito!`
        return res.status(200).redirect('/usuario/index');

    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.message);
    }
}