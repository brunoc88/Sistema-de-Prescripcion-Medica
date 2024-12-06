const Usuario = require('../models/usuario');

const bcrypt = require('bcrypt');//para encriptar

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
exports.altaUsuario = async(req,res)=>{
    try {
        const data = req.body;

        //busco que no exista otro usuario con ese mail
        const usuario = await Usuario.findOne({where:{email:data.email}});
        if(!data){
            return res.status(400).json('campos vacios!');
        }
        //si el usuario mando un mail que ya existe recargo pag con sus datos pre-establecidos
        if(data.email == usuario.email){
            
            return res.status(409).render('usuario/alta',{
                errorMessage: 'Ya existe un usuario registrado con ese email',
                FormData:{
                    nombre: data.nombre,
                    apellido: data.nombre,
                    email: data.email,
                    password: data.password,
                    rol: data.rol
                }
            })
           
        }
        //sino hubo problemas
        // Generar un salt para el hashing de la contraseña
        const salt = await bcrypt.genSalt(10);

        // Hashear la contraseña con el salt generado
        const hashedPassword = await bcrypt.hash(data.password, salt);

         // Asignar avatar: usar el subido o el predeterminado
         const avatar = req.file ? `/avatars/${req.file.filename}` : `/uploads/user.png`;
        // Crear un nuevo usuario con la contraseña hasheada
        await Usuario.create({
            nombre:data.nombre,
            apellido:data.apellido,
            email:data.email,
            password: hashedPassword, // Guardar la contraseña hasheada
            rol:data.rol,
            avatar
        });
        return res.status(200).redirect('/usuario/index');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error.errorMessage);
    }
}

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
