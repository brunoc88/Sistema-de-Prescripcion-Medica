const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');//para encriptar
const jwt = require('jsonwebtoken')//para trabajar con token

//GET vista login
exports.vistaLogin = async (req, res) => {
    try {
        return res.status(200).render('home/login');
    } catch (error) {
        return res.status(500).json('Hubo un error: ' + error);
    }
}
//POST login
exports.login = async (req, res) => {
    const body = req.body;
    const user = await Usuario.findOne({ email: body.email });
    if (user) {
        // Compara la contraseña del usuario con la contraseña hasheada en la BD
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            let token = jwt.sign({ 
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                rol: user.rol
            }, 'mi clave secreta', {
                expiresIn: '1h'
            }); // Expira en 1 hora

            // Guardar el token en una cookie
            res.cookie('token', token, {
                httpOnly: true, // La cookie solo se puede acceder en el servidor
                secure: true, // Solo se debe enviar por https
                samesite: 'strict', // La cookie solo se puede acceder del mismo dominio
                maxAge: 1000 * 60 * 60 // Expira en 1 hora
            });

            // Redirigir al usuario a la página principal
            return res.status(200).render('home/index');
        } else {
            return res.status(403).json({
                success: false, message: 'Usuario o contraseña incorrectos'
            });
        }
    } else {
        return res.status(404).json({
            success: false, message: 'Usuario no encontrado'
        });
    }
};

exports.logout = (req, res) => {
    // Eliminar la cookie que contiene el token
    res.clearCookie('token', {
        httpOnly: true, // Asegúrate de que coincidan las opciones de la cookie
        secure: true,
        samesite: 'strict'
    });

    // (Opcional) Eliminar cualquier otra información de sesión
    req.session.destroy();

    // Redirigir al usuario a la página de inicio de sesión
    res.status(200).redirect('/login');
};
