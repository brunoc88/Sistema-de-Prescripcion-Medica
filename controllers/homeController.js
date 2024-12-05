const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');//para encriptar
const jwt = require('jsonwebtoken')//para trabajar con token

//GET vista Index Home
exports.vistaIndexHome = async(req,res)=>{
    try {
        return res.status(200).render('home/index');
    } catch (error) {
        return  res.status(500).json('Hubo un error: ' + error.message);
    }
}


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
    try {
        const { email, password } = req.body;
        // Buscar usuario
        const user = await Usuario.findOne({ where: { email } });
        

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        if (!user.estado) {
            return res.status(403).json({ success: false, message: 'Usuario desactivado' });
        }

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(403).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }

        // Generar token
        const token = jwt.sign(
            {
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                rol: user.rol
            },
            'mi clave secreta',
            { expiresIn: '1h' }
        );

       

        // Limpiar cookies existentes y establecer una nueva
        res.clearCookie('token');
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 // 1 hora
        });

        return res.status(200).render('home/index');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
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
    res.status(200).redirect('/home/login');
};